// Custom hook
import { StyleSheet } from "react-native";
import { useMemo } from "react";

export const useCalcButtonStyles = () => {
  const { width, height } = Dimensions.get("window");

  // Responsive scaling helpers
  const scale = width / 375;
  const verticalScale = height / 812;

  const rs = (size) => Math.round(size * scale);
  const vs = (size) => Math.round(size * verticalScale);

  return useMemo(
    () =>
      StyleSheet.create({
        rowcontainer: {
          marginVertical: vs(4), // Add margin to the top
          marginHorizontal: rs(2), // Responsive horizontal margin
          flexDirection: "row", // Arrange buttons in a row
          width: "100%", // Full width
          alignContent: "flex-start",
          flexWrap: "wrap", // Allow wrapping if needed
          justifyContent: "space-between", // Space between buttons
        },
      }),
    []
  );
};
