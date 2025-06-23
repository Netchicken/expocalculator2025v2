import React, { useContext } from "react";
export const CalcContext = React.createContext();

export const CalcContextProvider = ({ children }) => {
  console.log("CalcContextProvider opened");
  const [calcResult, setCalcResult] = React.useState("");

  return <CalcContext.Provider value={{ calcResult, setCalcResult }}>{children}</CalcContext.Provider>;
};
export const useCalcContext = () => {
  console.log("useCalcContext opened");
  const context = React.useContext(CalcContext);
  if (!context) {
    throw new Error("useCalcContext must be used within a CalcContextProvider");
  }
  return context;
};
