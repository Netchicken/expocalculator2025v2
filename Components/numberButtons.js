import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableOpacityButton } from "./AllButtons";
import { Row } from "./Row"; // Import Row component

// This component shows number and function buttons for the calculator
export const NumberButtons = ({ updateCalculation }) => {
  return (
    <View>
      <Row>
        <TouchableOpacityButton
          text="0"
          onPress={() => updateCalculation("0")}
        />
        <TouchableOpacityButton
          text="1"
          onPress={() => updateCalculation("1")}
        />
        <TouchableOpacityButton
          text="2"
          onPress={() => updateCalculation("2")}
        />
      </Row>
      <Row>
        <TouchableOpacityButton
          text="3"
          onPress={() => updateCalculation("3")}
        />
        <TouchableOpacityButton
          text="4"
          onPress={() => updateCalculation("4")}
        />
        <TouchableOpacityButton
          text="5"
          onPress={() => updateCalculation("5")}
        />
      </Row>
      <Row>
        <TouchableOpacityButton
          text="6"
          onPress={() => updateCalculation("6")}
        />
        <TouchableOpacityButton
          text="7"
          onPress={() => updateCalculation("7")}
        />
        <TouchableOpacityButton
          text="8"
          onPress={() => updateCalculation("8")}
        />
      </Row>
      <Row>
        <TouchableOpacityButton
          text="9"
          onPress={() => updateCalculation("9")}
        />
        <TouchableOpacityButton
          text="."
          onPress={() => updateCalculation(".")}
        />
        <TouchableOpacityButton
          text="Del"
          onPress={() => updateCalculation("del")}
        />
      </Row>
      <Row>
        <TouchableOpacityButton
          text="="
          onPress={() => updateCalculation("=")}
        />
        <TouchableOpacityButton
          text="Clear"
          onPress={() => updateCalculation("clear")}
        />
      </Row>
    </View>
  );
};
