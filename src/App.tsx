import React, { createContext, useState } from 'react';
import { OtpLayout } from './ OtpLayout';
import './App.css';
import { Register } from './Register';
export const UserContext = createContext<any>("")
function App() {
  const [otp, setOtp] = useState<any>("")
  return (
    <UserContext.Provider value={{otp, setOtp}}>
     <Register/>
     {/* <OtpLayout/> */}
    </UserContext.Provider>
  );
}

export default App;
