import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { CalcButtons } from "./Components/calcbuttons";
import { NumberButtons } from "./Components/numberButtons";
import { useAppStyles } from "./AllStyles/appStyles"; // Custom hook for app styles
import { CalcContext } from "./Operations/calcContext";

// Main App component
const CalcMain = () => {
  // State for calculator input/output
  const [calculation, setCalculation] = useState("");
  const { setCalcResult } = useContext(CalcContext);
  // Handle calculator button presses
  const updateCalculation = (value) => {
    if (value === "=") {
      // Evaluate the calculation string
      try {
        // Evaluate the calculation using JavaScript's Function constructor
        // WARNING: In production, never use eval or Function with user input!
        let answer = new Function("return " + calculation)();
        setCalculation(calculation + "=" + answer);
      } catch {
        setCalculation("Error");
      }
    } else if (value === "clear") {
      setCalculation("");
    } else if (value === "del") {
      setCalculation(calculation.slice(0, -1)); // Remove last character
    } else {
      setCalculation(calculation + String(value)); // Add the pressed value to the calculation string
    }
    //pass the answer to the context
    setCalcResult(calculation);
  };

  // Memoize styles for performance
  const styles = useAppStyles();

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("./Assets/bgImage.png")} // Background image
      style={styles.image}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.sectionTitle}>
                React Native Simple Calculator
              </Text>
              <View style={styles.calcBox}>
                <Text style={styles.outputText}>
                  {calculation || "Enter a number"}
                </Text>
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
