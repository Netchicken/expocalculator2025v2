import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
// import { useDbOperationStyles } from "./AllStyles/dbOperationsStyles";
import { useAppStyles } from "./AllStyles/appStyles";
// Import the context for state management
import { Context } from "./Operations/Context";
// Import the components for displaying buttons and handling database operations
import DbButtons from "./Components/DbButtons";
import { Pressable, Alert } from "react-native";
import EditDialogue from "./Components/EditDialogue";
import Toast from "react-native-toast-message"; //https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
import { createTable, loadDB, clearDatabase, addItem, getFromDB } from "./Operations/DbOperations"; // Import the functions from DbOperations}

// Load the database
// This function initializes the database connection and creates the necessary table if it doesn't exist
const db = loadDB();

const DisplayDB = () => {
  console.log("Database DisplayDB:");
  // Initialize the styles for the component
  // This allows the component to use the styles defined in appStyles.js
  const appStyles = useAppStyles();
  // Initialize the state to hold the list of answers from the database
  // This state will be updated whenever new items are added to the database
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

  // Function to show a toast message when the database is cleared
  // This function uses the Toast component to display a success message
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "The Database has been wiped clean. 👋",
      text1Style: { fontSize: 16 }, // Increase title font size
      text2Style: { fontSize: 16 }, // Increase message font size
    });
  };

  // Create the table if it doesn't exist
  // This useEffect runs once when the component mounts
  useEffect(() => {
    createTable(db); // Call the function to create the table if not exists
    // This ensures that the database is ready to use when the component loads
    // Check if the database is opened
    if (!db) {
      console.log("Database not opened!");
      return;
    }
  }, []);

  // Add item whenever calcResult changes and is not empty
  useEffect(() => {
    if (calcResult) {
      addItem(calcResult, db); // Call the addItem function from DbOperations
      // After adding the item, fetch the updated list from the database
      getFromDB(db, setListAnswers);
    }
  }, [calcResult]);

  // Fetch the list of answers from the database when the component mounts
  //open the dialogue box when you click on an entry and pass in the id of the entry
  // and the calculation to be modified
  const editItem = (Id, oldValue) => {
    console.log("Editing item with Id:", Id, "and old value:", oldValue);
    setEditId(Id);
    setEditOldValue(oldValue);
    setEditNewValue(oldValue);
    setEditDialogVisible(true);
  };

  // Function to handle the cancel action in the edit dialog
  const handleEditCancel = () => {
    setEditDialogVisible(false);
  };
  // Function to clear the database and update the list of answers
  const clearDatabaseAndList = () => {
    clearDatabase(db); // Clear the database
    // clears both the database and the list of answers
    getFromDB(db, setListAnswers);
    showToast(); // Show a success toast message
  };
  // Function to handle the submission of the edit dialog
  // This function updates the item in the database with the new value
  const handleEditSubmit = () => {
    if (editNewValue && editNewValue !== editOldValue && editId !== null) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE AllAnswers SET answer = ? WHERE Id = ?",
            [editNewValue, editId],
            () => {
              // If the update is successful, fetch the updated list from the database
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
          <Text>Click Calculation to edit</Text>
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
                    <Text style={appStyles.liText}>{item.answer}</Text>
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
