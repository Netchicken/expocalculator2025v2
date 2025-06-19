import { StyleSheet, Dimensions } from "react-native";
import { useMemo } from "react";

// Custom hook to create and memoize button styles
export const useButtonStyles = () => {
  // Get the current device's screen width and height
  const { width, height } = Dimensions.get("window");
  // Calculate scaling factors based on a standard mobile screen size (iPhone 11: 375x812)
  const scale = width / 375; // 375 is a common base width (iPhone 11)  Used for horizontal scaling (width, font size, etc.)
  const verticalScale = height / 812; // 812 is a common base height Used for vertical scaling (height, vertical spacing)

  // Helper functions for responsive scaling
  const rs = (size) => Math.round(size * scale); // Responsive scale for width, font, etc.
  const vs = (size) => Math.round(size * verticalScale); // Responsive scale for height, vertical spacing

  // Calculate button width so buttons fit evenly across the screen
  const buttonWidth = width / 4;

  // Memoize the styles so they only recalculate when width or height changes
  return useMemo(
    () =>
      StyleSheet.create({
        // Style for standard calculator buttons (e.g., numbers)
        button: {
          borderWidth: 2, // Thin border for button outline
          borderColor: "#90caf9", // Soft blue border color for a modern look
          backgroundColor: "#e3f2fd", // Light blue background for standard buttons
          flex: 1, // Take up available space in the row
          height: Math.floor(buttonWidth - rs(20)), // Responsive height based on screen width
          alignItems: "center", // Center content horizontally
          justifyContent: "center", // Center content vertically
          borderRadius: rs(18), // Rounded corners, responsive to screen size
          margin: rs(6), // Space around each button
          elevation: 2, // Subtle shadow for Android
          shadowColor: "#1976d2", // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        // Style for text inside standard buttons
        text: {
          color: "#1976d2", // Deep blue text for contrast and readability
          fontSize: rs(24), // Responsive font size
          fontWeight: "600", // Semi-bold for clarity
          letterSpacing: scale, // Slightly spaced letters for readability
        },
        // Style for special pressable buttons (e.g., operators, DB actions)
        buttonPress: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#81c784", // Soft green border for distinction
          backgroundColor: "#e8f5e9", // Light green background for operators/actions
          alignSelf: "stretch",
          borderRadius: rs(18),
          margin: rs(6),
          elevation: 2,
          shadowColor: "#388e3c",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        // Style for text inside pressable buttons
        textPress: {
          color: "#388e3c", // Deep green text for operator/action buttons
          fontSize: rs(22), // Responsive font size
          fontWeight: "bold", // Bold for emphasis
          letterSpacing: scale,
          textAlignVertical: "center", // Center text vertically (Android only)
        },
      }),
    [width, height]
  );
};
