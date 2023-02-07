import React, { createContext, useState } from "react";
import "./App.css";
import { Register1 } from "./component/Register1";
// import { Register } from './Register';
export const UserContext = createContext<any>({});
function App() {
  const [inputDigit, setInputDigit] = useState<string>("");
  const [otp, setOtp] = useState<string[]>([]);
  const [counter, setCounter] = useState(15);
  const [count, setCount] = useState<any>(5);
  const [greenBorder, setGreenBorder] = useState<string>(""); //state to set green border
  const [redBorder, setRedBorder] = useState<string>(""); //state to set red border
  return (
    <UserContext.Provider
      value={{
        otp,
        setOtp,
        inputDigit,
        setInputDigit,
        count,
        setCount,
        counter,
        setCounter,
        greenBorder,
        setGreenBorder,
        redBorder,
        setRedBorder,
      }}
    >
      {/* <Register/> */}
      <Register1 />
    </UserContext.Provider>
  );
}

export default App;
