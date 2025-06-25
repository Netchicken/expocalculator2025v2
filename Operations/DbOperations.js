import SQLite from "react-native-sqlite-storage";

//use this to test if the database has been created correctly, otherwise you can't tell if createTable is working

export const deleteDatabase = () => {
  console.log("Deleting database...");
  SQLite.deleteDatabase(
    { name: "calcDB.db", location: "default" },
    () => {
      console.log("Database deleted successfully");
    },
    (error) => {
      console.log("Error deleting database:", error);
    }
  );
};

// CreateTable creates the SQLite table if it does not already exist.
// This function is called once when the app starts to ensure the table is ready for use.
export const createTable = (db) => {
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
};

//loadDB opens the SQLite database and returns the database object.
export const loadDB = () => {
  return SQLite.openDatabase(
    { name: "calcDB.db", location: "default" },
    () => {
      console.log("DB opened for real");
    },
    (error) => {
      console.log("DB open error:", error);
    }
  );
};

// Add item to the database
// This function is called after the table is created
export const addItem = (calcResult, db) => {
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

// Function to clear all answers from the database
export const clearDatabase = (db) => {
  console.log("Clearing database...");
  db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM AllAnswers;",
        [],
        () => {
          console.log("All data cleared from database.");
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

// getFromDB fetches all answers from the database and passes them to the provided callback.
// Usage: getFromDB(db, setListAnswers);
// This ensures the UI is updated with the latest data from the database.

// This function retrieves all answers from the database and calls the callback with the results.
// It is used to fetch data after adding or clearing items in the database.
export const getFromDB = (db, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT Id, answer FROM AllAnswers;",
      [],
      (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        console.log("Fetched items from database:", rows);
        if (callback) callback(rows);
      },
      (tx, error) => {
        console.log("Error fetching items:", error);
        if (callback) callback([]);
      }
    );
  });
};
