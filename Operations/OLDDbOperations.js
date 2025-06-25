import React, { useState, useEffect, useContext } from "react";
//import SQLite from "react-native-sqlite-2";
import SQLite from "react-native-sqlite-storage"; // Import SQLite for database operations
import {
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

// THIS FILE IS OLD CODE FROM 2022 AND IS NOT USED IN THIS PROJECT BY KEPT AS EXAMPLES OF CRUD.
//You can never have too many examples of CRUD operations.

const databaseName = "calcDB.db";
let singleAnswer = "";

// Component to get and display database answers
export const GetDb = () => {
  const styles = useDbOperationStyles(); // Use custom hook for styles
  const [listAnswers, setListAnswers] = useState([]); // State for answers
  const { calcResult, setCalcResult } = useContext(CalcContext);
  useEffect(() => {
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
    //Check that db is not null before using it:

    if (!db) {
      console.log("Database not opened!");
      return;
    }
    // SQL to create table if it doesn't exist
    const createString = "CREATE TABLE IF NOT EXISTS AllAnswers(Id INTEGER PRIMARY KEY AUTOINCREMENT, answer TEXT)";

    db.transaction((txn) => {
      // Create table
      txn.executeSql(
        createString,
        [],
        () => {},
        (error) => {
          console.log("execute error: " + JSON.stringify(error));
        }
      );
      singleAnswer = calcResult;
      // Insert answer if available
      if (singleAnswer !== "") {
        txn.executeSql("INSERT INTO AllAnswers (answer) VALUES (?)", [singleAnswer]);
        singleAnswer = ""; // Reset after insert
        setCalcResult(""); //reset user to empty string
      }

      // Select all answers from the table
      txn.executeSql(
        "SELECT answer FROM AllAnswers",
        [],
        (tx, result) => {
          const answers = [];
          for (let i = 0; i < result.rows.length; ++i) {
            answers.push(result.rows.item(i).answer);
          }
          setListAnswers(answers); // Update state
        },
        (error) => {
          console.log("select error: " + JSON.stringify(error));
        }
      );
    });
  }, []); // Run only once when component mounts

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {listAnswers &&
          listAnswers.map((item, index) => (
            <View key={index}>
              <Text style={styles.text}>{item}</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
