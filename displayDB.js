import React, { useState, useEffect, useContext } from "react";
import SQLite from "react-native-sqlite-storage";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
import { useDbOperationStyles } from "./AllStyles/dbOperationsStyles";
import { useAppStyles } from "./AllStyles/appStyles";
// Import the context for state management
import { Context } from "./Operations/Context";
// Import the components for displaying buttons and handling database operations
import DbButtons from "./Components/DbButtons";
import { Pressable, Alert } from "react-native";
import EditDialogue from "./Components/EditDialogue";

import { clearDatabase, addItem, getFromDB } from "./Operations/DbOperations"; // Import the functions from DbOperations}

// Enable SQLite debugging

const db = SQLite.openDatabase(
  { name: "calcDB.db", location: "default" },
  () => {
    console.log("DB opened for real");
  },
  (error) => {
    console.log("DB open error:", error);
  }
);

const DisplayDB = () => {
  console.log("Database DisplayDB:");
  const styles = useDbOperationStyles();
  const appStyles = useAppStyles();
  const [listAnswers, setListAnswers] = useState([]);
  // Use the context to get the calculation result and function to update it
  // This allows the calculator to share its state with other components if needed
  const { calcResult, setCalcResult } = useContext(Context);

  //editDialogVisible is used to control the visibility of the edit dialog
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editOldValue, setEditOldValue] = useState("");
  const [editNewValue, setEditNewValue] = useState("");
  const [editId, setEditId] = useState(null);

  console.log("Database calcResult:", calcResult);

  // Create the table if it doesn't exist
  // This useEffect runs once when the component mounts
  useEffect(() => {
    if (!db) {
      console.log("Database not opened!");
      return;
    }
    const createString = "CREATE TABLE IF NOT EXISTS AllAnswers(Id INTEGER PRIMARY KEY AUTOINCREMENT, answer TEXT)";

    db.transaction(
      (tx) => {
        tx.executeSql(createString);
      },
      (error) => {
        console.log("Error creating table:", error);
      }
    );
    console.log("Table created or already exists");
  }, []);

  // Add item whenever calcResult changes and is not empty
  useEffect(() => {
    if (calcResult) {
      addItem(calcResult, db); // Call the addItem function from DbOperations
      // To fetch and set listAnswers:
      getFromDB(db, setListAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcResult]);

  const editItem = (Id, oldValue) => {
    console.log("Editing item with Id:", Id, "and old value:", oldValue);
    setEditId(Id);
    setEditOldValue(oldValue);
    setEditNewValue(oldValue);
    setEditDialogVisible(true);
  };

  const handleEditCancel = () => {
    setEditDialogVisible(false);
  };

  const clearDatabaseAndList = () => {
    clearDatabase(db); // Clear the database
    // To fetch and set listAnswers:
    getFromDB(db, setListAnswers);
    Alert.alert("Database cleared", "All entries have been removed from the database.");
  };

  const handleEditSubmit = () => {
    if (editNewValue && editNewValue !== editOldValue && editId !== null) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE AllAnswers SET answer = ? WHERE Id = ?",
            [editNewValue, editId],
            () => {
              getFromDB(db, setListAnswers);
              setEditDialogVisible(false);
            },
            (tx, error) => {
              console.log("Error updating item:", error);
              setEditDialogVisible(false);
            }
          );
        },
        (error) => {
          console.log("Transaction error:", error);
          setEditDialogVisible(false);
        }
      );
    } else {
      setEditDialogVisible(false);
    }
  };

  return (
    <ImageBackground resizeMode="cover" source={require("./Assets/bgImage.png")} style={appStyles.image}>
      <View style={appStyles.container}>
        <SafeAreaView>
          <Text style={appStyles.sectionTitle}>Database</Text>
          <Text>Latest Calculation: {calcResult}</Text>
          <DbButtons clearDatabase={() => clearDatabaseAndList()} />

          <EditDialogue
            visible={editDialogVisible}
            value={editNewValue}
            onChange={setEditNewValue}
            onCancel={handleEditCancel}
            onSubmit={handleEditSubmit}
          />

          <ScrollView>
            {listAnswers &&
              listAnswers.map((item, index) => (
                <Pressable key={item.Id} onPress={() => editItem(item.Id, item.answer)}>
                  <View>
                    <Text style={styles.text}>{item.answer}</Text>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default DisplayDB;
