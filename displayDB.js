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
import Dialog from "react-native-dialog";

import { clearDatabase, addItem } from "./Operations/DbOperations"; // Import the functions from DbOperations}

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
      fetchItems(); // Fetch items after creating the table
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcResult]);

  // Add item to the database
  // This function is called after the table is created
  // const addItem = () => {
  //   if (!calcResult) return;
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         "INSERT INTO AllAnswers (answer) VALUES (?)",
  //         [calcResult],
  //         () => {
  //           console.log("Item added to database:", calcResult);
  //           // Clear the context after adding
  //           //It also prevents duplicate entries if the user doesn’t change the calculation.
  //         },
  //         (tx, error) => {
  //           console.log("Error inserting item:", error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log("Transaction error:", error);
  //     }
  //   );
  // };
  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT answer FROM AllAnswers;", [], (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        setListAnswers(rows);
      });
    });
  };

  // Function to clear all answers from the database
  // const clearDatabase = () => {
  //   console.log("Clearing database...");
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         "DELETE FROM AllAnswers;",
  //         [],
  //         () => {
  //           console.log("All data cleared from database.");
  //           fetchItems(); // Refresh the list after clearing
  //         },
  //         (tx, error) => {
  //           console.log("Error clearing database:", error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log("Transaction error:", error);
  //     }
  //   );
  // };

  const editItem = (oldValue) => {
    setEditOldValue(oldValue);
    setEditNewValue(oldValue);
    setEditDialogVisible(true);
  };

  const handleEditCancel = () => {
    setEditDialogVisible(false);
  };

  const handleEditSubmit = () => {
    if (editNewValue && editNewValue !== editOldValue) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE AllAnswers SET answer = ? WHERE answer = ?",
            [editNewValue, editOldValue],
            () => {
              fetchItems();
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
          <DbButtons clearDatabase={() => clearDatabase(fetchItems, db)} />

          <Dialog.Container visible={editDialogVisible}>
            <Dialog.Title>Edit Entry</Dialog.Title>
            <Dialog.Description>Enter new value:</Dialog.Description>
            <Dialog.Input value={editNewValue} onChangeText={setEditNewValue} />
            <Dialog.Button label="Cancel" onPress={handleEditCancel} />
            <Dialog.Button label="OK" onPress={handleEditSubmit} />
          </Dialog.Container>
          <ScrollView>
            {listAnswers &&
              listAnswers.map((item, index) => (
                <Pressable key={index} onPress={() => editItem(item.answer)}>
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
