import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
import CalcButtons from "./Components/calcbuttons";
import NumberButtons from "./Components/numberButtons";
import { useAppStyles } from "./AllStyles/appStyles";
import { Context } from "./Operations/Context"; // Import the context for state management
import { deleteDatabase } from "./Operations/DbOperations";

// Main component for the calculator
// This component handles the main logic of the calculator, including state management and UI rendering
const CalcMain = () => {
  console.log("Calculator Main");

  // useEffect(() => {
  //   // Call the deleteDatabase function to clear the database when the app starts
  //   deleteDatabase();
  // }, []);

  // Use the context to get the calculation result and function to update it
  // This allows the calculator to share its state with other components if needed
  const { calcResult, setCalcResult } = useContext(Context);

  const [calculation, setCalculation] = useState("");
  console.log("Calculator after state:", calculation);

  // Function to update the calculation based on button presses
  // Handles numbers, operators, equals, clear, and delete actions
  const updateCalculation = (value) => {
    if (value === "=") {
      try {
        // Evaluate the calculation string and update the state with the result
        let answer = new Function("return " + calculation)();
        setCalculation(calculation + "=" + answer);
        // Update the context with the calculation result
        setCalcResult(calculation + "=" + answer);
      } catch {
        setCalculation("Error");
      }
    } else if (value === "clear") {
      setCalculation("");
    } else if (value === "del") {
      //.slice(0, -1) creates a new string with all characters except the last one (removes the last character).
      setCalculation(calculation.slice(0, -1));
    } else {
      setCalculation(calculation + String(value));
    }
  };

  const styles = useAppStyles();

  return (
    <ImageBackground resizeMode="cover" source={require("./Assets/bgImage.png")} style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.sectionTitle}>React Native Simple Calculator</Text>
              <View style={styles.calcBox}>
                <Text style={styles.outputText}>{calculation || "Enter a number"}</Text>
              </View>
              <CalcButtons updateCalculation={updateCalculation} />
              <NumberButtons updateCalculation={updateCalculation} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default CalcMain;
