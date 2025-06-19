import { Row } from "./Row"; // Import Row component
import { PressableButton } from "./AllButtons";

// This component shows calculator buttons (+, *, /, -)
export const CalcButtons = ({ updateCalculation }) => {
  return (
    <Row>
      <PressableButton onPress={updateCalculation} symbol="+" />
      <PressableButton onPress={updateCalculation} symbol="*" />
      <PressableButton onPress={updateCalculation} symbol="/" />
      <PressableButton onPress={updateCalculation} symbol="-" />
    </Row>
  );
};
