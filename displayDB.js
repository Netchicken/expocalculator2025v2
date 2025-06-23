import React, { useState, useEffect, useContext } from "react";
import SQLite from "react-native-sqlite-storage";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
import { useDbOperationStyles } from "./AllStyles/dbOperationsStyles";
import { useAppStyles } from "./AllStyles/appStyles";
import { CalcContext } from "./Operations/calcContext";
import DbButtons from "./Components/DbButtons";

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

// Function to clear all answers from the database
const clearDatabase = () => {
  console.log("Clearing database...");
  db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM AllAnswers;",
        [],
        () => {
          console.log("All data cleared from database.");
          fetchItems(); // Refresh the list after clearing
        },
        (tx, error) => {
          console.log("Error clearing database:", error);
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
    }
  );
};

const DisplayDB = () => {
  console.log("Database DisplayDB:");
  const styles = useDbOperationStyles();
  const appStyles = useAppStyles();
  const [listAnswers, setListAnswers] = useState([]);
  const { calcResult, setCalcResult } = useContext(CalcContext);

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
      addItem();
      fetchItems(); // Fetch items after creating the table
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcResult]);

  // Add item to the database
  // This function is called after the table is created
  const addItem = () => {
    if (!calcResult) return;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO AllAnswers (answer) VALUES (?)",
          [calcResult],
          () => {
            console.log("Item added to database:", calcResult);
            // Clear the context after adding
            //It also prevents duplicate entries if the user doesn’t change the calculation.
            setCalcResult(""); // Clear the context after adding
          },
          (tx, error) => {
            console.log("Error inserting item:", error);
          }
        );
      },
      (error) => {
        console.log("Transaction error:", error);
      }
    );
  };
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

  return (
    <ImageBackground resizeMode="cover" source={require("./Assets/bgImage.png")} style={appStyles.image}>
      <View style={appStyles.container}>
        <SafeAreaView>
          <Text style={appStyles.sectionTitle}>Database</Text>
          <Text>Latest Calculation: {calcResult}</Text>
          <DbButtons clearDatabase={clearDatabase} />
          <ScrollView>
            {listAnswers &&
              listAnswers.map((item, index) => (
                <View key={index}>
                  <Text style={styles.text}>{item.answer}</Text>
                </View>
              ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default DisplayDB;
