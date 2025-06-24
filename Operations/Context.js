import React, { useState, useContext } from "react";
export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  console.log("CalcContextProvider opened");
  const [calcResult, setCalcResult] = useState("");

  return <Context.Provider value={{ calcResult, setCalcResult }}>{children}</Context.Provider>;
};
export const useCalcContext = () => {
  console.log("useCalcContext opened");
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCalcContext must be used within a CalcContextProvider");
  }
  return context;
};
