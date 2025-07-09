import React from "react";
import { Row } from "./Row"; // Import Row component
import { PressableButton } from "./AllButtons";

// This component shows database operation buttons
const DbButtons = ({ clearDatabase }) => {
  return (
    <Row>
      <PressableButton onPress={clearDatabase} symbol="Delete All" />
    </Row>
  );
};
//
export default DbButtons;
