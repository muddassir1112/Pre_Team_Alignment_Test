import React, { createContext, useState } from 'react';
import './App.css';
import { Register1 } from './component/Register1';
// import { Register } from './Register';
export const UserContext = createContext<any>({});
function App() {
  const [inputDigit, setInputDigit] = useState<string>("");
  const [otp, setOtp] = useState<string[]>([]);
  return (
    <UserContext.Provider value={{ otp, setOtp, inputDigit, setInputDigit }}>
     {/* <Register/> */}
     <Register1/>
    </UserContext.Provider>
  );
}

export default App;
