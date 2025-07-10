import { StyleSheet, Dimensions } from "react-native";
import { useMemo } from "react";

export const useAppStyles = () => {
  const { width, height } = Dimensions.get("window");

  // Responsive font and spacing helpers
  const scale = width / 375; // 375 is a common base width (iPhone 11)
  const verticalScale = height / 812; // 812 is a common base height

  // Helper function for scaling
  const rs = (size) => Math.round(size * scale);
  const vs = (size) => Math.round(size * verticalScale);

  return useMemo(
    () =>
      StyleSheet.create({
        image: {
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },
        icon: {
          width: 48,
          height: 48,
          marginLeft: 12, // add spacing between text and image
          alignSelf: "center",
          resizeMode: "contain", // Optional: keeps aspect ratio
          marginVertical: 16, // Optional: spacing
        },
        container: {
          flex: 1,
          marginTop: vs(32),
          paddingHorizontal: rs(12),
        },
        calcBox: {
          minHeight: vs(50), // Minimum height for one line
          maxHeight: vs(100), // Maximum height for two lines
          justifyContent: "center", // Center children vertically
          alignItems: "center", // Center children horizontally
          borderRadius: rs(32),
          paddingHorizontal: rs(18), // Horizontal padding (left & right)
          paddingVertical: vs(12), // Vertical padding (top & bottom)
          backgroundColor: "oldlace",
          marginBottom: vs(28),
          borderWidth: 1,
        },
        outputText: {
          fontWeight: "bold",
          textAlign: "center", // Center text horizontally
          textAlignVertical: "center", // Center text vertically (Android only)
          fontSize: rs(30),
          color: "#333",
          lineHeight: vs(36), // Should match container height for vertical centering
        },

        sectionTitle: {
          color: "#1976d2",
          fontSize: rs(28),
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: vs(18),
          letterSpacing: 1.5 * scale,
          textTransform: "uppercase",
          backgroundColor: "#e3f2fd",
          paddingVertical: vs(10),
          paddingHorizontal: rs(20),
          borderRadius: rs(16),
          overflow: "hidden",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
        },

        // Example list styles (if needed)
        liContainer: {
          backgroundColor: "#f5f5f5",
          flex: 1,
          paddingLeft: rs(8),
          paddingVertical: vs(4),
          borderRadius: rs(8),
          marginBottom: vs(6),
        },
        liText: {
          color: "#333",
          fontSize: rs(17),
          fontWeight: "400",
        },
      }),
    []
  );
};
