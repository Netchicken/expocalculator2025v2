import React, { useMemo } from "react";
import { Row } from "./Row"; // Import Row component
import { PressableButton } from "./AllButtons";

// This component shows database operation buttons
export const DbButtons = ({ sqlOperation }) => {
  return (
    <Row>
      <PressableButton onPress={sqlOperation} symbol="Display" />
      <PressableButton onPress={sqlOperation} symbol="Add" />
      <PressableButton onPress={sqlOperation} symbol="Delete" />
      <PressableButton onPress={sqlOperation} symbol="Edit" />
    </Row>
  );
};
//
