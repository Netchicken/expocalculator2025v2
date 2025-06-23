import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View, ImageBackground } from "react-native";
import CalcButtons from "./Components/calcbuttons";
import NumberButtons from "./Components/numberButtons";
import { useAppStyles } from "./AllStyles/appStyles";
import { CalcContext } from "./Operations/calcContext";

const CalcMain = () => {
  const { calcResult, setCalcResult } = useContext(CalcContext);
  const [calculation, setCalculation] = useState("");

  const updateCalculation = (value) => {
    if (value === "=") {
      try {
        let answer = new Function("return " + calculation)();
        setCalculation(calculation + "=" + answer);
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
    setCalcResult(calculation);
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
