import { StyleSheet, Dimensions } from "react-native";
import { useMemo } from "react";

export const useDbOperationStyles = () => {
  const { width, height } = Dimensions.get("window");

  // Responsive scaling helpers
  const scale = width / 375;
  const verticalScale = height / 812;

  const rs = (size) => Math.round(size * scale);
  const vs = (size) => Math.round(size * verticalScale);

  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          fontSize: rs(15),
          fontWeight: "bold",
          margin: rs(2),
        },
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: rs(10),
        },
        UpdateButton: {
          width: rs(120),
          height: vs(40),
          borderRadius: rs(10),
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          margin: rs(5),
        },
        UpdateButtonText: {
          color: "#fff",
          fontSize: rs(16),
        },
        DeleteButton: {
          width: rs(120),
          height: vs(40),
          borderRadius: rs(10),
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          margin: rs(5),
        },
        DeleteButtonText: {
          color: "#fff",
          fontSize: rs(16),
        },
        sectionContainer: {
          marginTop: vs(10),
          paddingHorizontal: rs(24),
        },
        sectionTitle: {
          fontSize: rs(24),
          fontWeight: "600",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: vs(8),
        },
      }),
    [width, height]
  );
};
