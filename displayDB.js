import React, { useState, useEffect, useContext } from "react";
import SQLite from "react-native-sqlite-storage";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { useDbOperationStyles } from "./AllStyles/dbOperationsStyles";
import { CalcContext } from "./Operations/calcContext";

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
  const styles = useDbOperationStyles();
  const [listAnswers, setListAnswers] = useState([]);
  const { calcResult, setCalcResult } = useContext(CalcContext);

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
      null,
      addItem
    );
  }, []);

  const addItem = () => {
    if (!calcResult) return;
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO AllAnswers (answer) VALUES (?)", [calcResult], () => {
        setCalcResult("");
        fetchItems();
      });
    });
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {listAnswers &&
            listAnswers.map((item, index) => (
              <View key={index}>
                <Text style={styles.text}>{item.answer}</Text>
                <Text>Latest Calculation: {calcResult}</Text>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
      <Text>DisplayDB works!</Text>
    </View>
  );
};

export default DisplayDB;
