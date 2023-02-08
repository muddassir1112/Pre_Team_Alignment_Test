import React, { createContext, useState } from "react";
import "./App.css";
import { Register } from "./component/Register";
export const UserContext = createContext<any>({});
function App() {
  const [inputDigit, setInputDigit] = useState<string>("");//user input digit
  const [otp, setOtp] = useState<string[]>([]); //array state to store the generated otp
  return (
    <UserContext.Provider
      value={{
        otp,
        setOtp,
        inputDigit,
        setInputDigit,
      }}
    >
      <Register />
    </UserContext.Provider>
  );
}

export default App;
