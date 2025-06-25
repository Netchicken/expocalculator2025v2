import React, { useState, useContext } from "react";
// Create a context for the calculator state
// This context will be used to share the calculation result across components
export const Context = React.createContext();

// ContextProvider component to provide the calculator state to its children
// This component wraps the application and provides the context value
export const ContextProvider = ({ children }) => {
  console.log("CalcContextProvider opened");
  const [calcResult, setCalcResult] = useState("");

  return <Context.Provider value={{ calcResult, setCalcResult }}>{children}</Context.Provider>;
};

// Custom hook to use the calculator context
// This hook allows components to access the calculator state without needing to use the Context.Consumer directly
// export const useCalcContext = () => {
//   console.log("useCalcContext opened");
//   const context = useContext(Context);
//   if (!context) {
//     throw new Error("useCalcContext must be used within a CalcContextProvider");
//   }
//   return context;
// };
