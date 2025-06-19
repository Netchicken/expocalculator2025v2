import React, { useState, useEffect, useContext } from "react";
//import SQLite from "react-native-sqlite-2";
import SQLite from "react-native-sqlite-storage"; // Import SQLite for database operations
import {
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useDbOperationStyles } from "./AllStyles/dbOperationsStyles"; // Import styles

import { CalcContext } from "./Operations/calcContext"; // Import context for calculator operations

const databaseName = "calcDB.db";
let singleAnswer = "";

// Function to set the answer to be inserted
export const PassData = ({ data }) => {
  //  singleAnswer = data;
};
// Open the database
const db = SQLite.openDatabase(
  { name: "calcDB.db", location: "default" },
  () => {
    console.log("DB opened");
  },
  (error) => {
    console.log("DB open error:", error);
  }
);

// Component to get and display database answers
export const displayDB = () => {
  const styles = useDbOperationStyles(); // Use custom hook for styles
  const [listAnswers, setListAnswers] = useState([]); // State for answers
  const { calcResult, setCalcResult } = useContext(CalcContext);
  // singleAnswer = calcResult; // Use the latest calculation result from context

  useEffect(() => {
    //Check that db is not null before using it:
    if (!db) {
      console.log("Database not opened!");
      return;
    }

    // SQL to create table if it doesn't exist
    const createString =
      "CREATE TABLE IF NOT EXISTS AllAnswers(Id INTEGER PRIMARY KEY AUTOINCREMENT, answer TEXT)";

    db.transaction(
      (tx) => {
        tx.executeSql(createString);
      },
      null,
      addItem
    );
  }, []);

  // Add new item
  const addItem = () => {
    // Check if calcResult is not empty before inserting
    if (!calcResult) return;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO AllAnswers (answer) VALUES (?)",
        [calcResult],
        () => {
          setCalcResult(""); //reset user to empty string
          fetchItems();
        }
      );
    });
  };

  // Fetch all items from DB
  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql("answer FROM AllAnswers;", [], (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        setListAnswers(rows);
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {listAnswers &&
          listAnswers.map((item, index) => (
            <View key={index}>
              <Text style={styles.text}>{item}</Text>
              <Text>Latest Calculation: {calcResult}</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
