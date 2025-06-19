import {
  Text, // Used to show text
  TouchableOpacity, // A button that fades when pressed
  Pressable, // A button that can detect different press states
} from "react-native";

import { useButtonStyles } from "../AllStyles/allbuttonStyles"; // Import styles from allStyles.js

export const TouchableOpacityButton = ({ onPress, text }) => {
  const styles = useButtonStyles();
  // This button calls onPress when pressed and shows the text
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const PressableButton = ({ onPress, symbol }) => {
  const styles = useButtonStyles();
  // This button calls onPress with the symbol when pressed and shows the symbol
  return (
    <Pressable onPress={() => onPress(symbol)} style={styles.buttonPress}>
      <Text style={styles.textPress}>{symbol}</Text>
    </Pressable>
  );
};
