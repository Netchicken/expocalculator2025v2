import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";

// The Row component is a reusable layout component.
// It arranges its children horizontally in a row, with optional wrapping.
// Usage: Place any number of child components inside <Row>...</Row>
export const Row = ({ children }) => {
  // Get the row styles from the custom hook
  const styles = useRowStyles();
  // Render a View with row styling, containing the children passed to this component
  return <View style={styles.rowcontainer}>{children}</View>;
};

// Custom hook to create and memoize row styles
// This ensures styles are only recalculated if the screen size changes
const useRowStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        rowcontainer: {
          flexDirection: "row", // Arrange children in a horizontal row
          alignContent: "flex-start", // Align content to the start of the cross axis
          flexWrap: "wrap", // Allow children to wrap to the next line if needed
          // You can add margin or padding here if you want spacing between rows
        },
      }),
    []
  );
