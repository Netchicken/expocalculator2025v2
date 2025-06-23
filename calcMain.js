import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
import CalcButtons from "./Components/calcbuttons";
import NumberButtons from "./Components/numberButtons";
import { useAppStyles } from "./AllStyles/appStyles";
import { CalcContext } from "./Operations/calcContext";

const CalcMain = () => {
  console.log("Calculator Main");
  const { calcResult, setCalcResult } = useContext(CalcContext);
  const [calculation, setCalculation] = useState("");
  console.log("Calculator after state:", calculation);

  const updateCalculation = (value) => {
    if (value === "=") {
      try {
        let answer = new Function("return " + calculation)();
        setCalculation(calculation + "=" + answer);
        setCalcResult(calculation + "=" + answer);
      } catch {
        setCalculation("Error");
      }
    } else if (value === "clear") {
      setCalculation("");
    } else if (value === "del") {
      setCalculation(calculation.slice(0, -1));
    } else {
      setCalculation(calculation + String(value));
    }
  };

  // Sync calculation to context
  // This useEffect will update calcResult whenever calculation changes
  // It ensures that the context is always in sync with the current calculation
  // useEffect(() => {
  //   //update the context with the current calculation
  //   console.log("Updating calcResult in context:", calculation);
  //   setCalcResult(calculation);
  // }, [calculation, setCalcResult]);

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
