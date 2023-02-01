import React, { createContext, useRef, useState } from "react";
import { OtpLayout } from "./ OtpLayout";
export const UserContext = createContext<any>("");
export const Register = () => {
  const [otp, setOtp] = useState<any>([]); //array states to hold the otp
  const [count, setCount] = useState<number>(5); //counter for attempts
  const [greenBorder, setGreenBorder] = useState<string>(""); //state to set green border
  const [redBorder, setRedBorder] = useState<string>(""); //state to set red border
  const [SentSuccess, setSentSuccess] = useState<string>(""); //state to show when passcode sent successfully
  const [failureMsg, setFailureMsg] = useState(""); //state for mismatch
  const [timer, setTimer] = useState<number>(60);//state for timer
  // refs to manipulation of input boxes
  const input0: any = useRef();
  const input1: any = useRef();
  const input2: any = useRef();
  const input3: any = useRef();
  const input4: any = useRef();
  // function to genarate otp
  const generateOtp = (e: React.SyntheticEvent) => {
    let number: any;
    let temp;
    // condition to check remaining attempts
    if (count > 1) {
      setCount((prev) => prev - 1);
      number = JSON.stringify(Math.ceil(Math.random() * 100000));
      temp = number.split("");
      for (let i = 0; i < temp.length; i++) {
        if (temp.length < 5) {
          temp.push(Math.ceil(Math.random() * 10));
        }
      }
    } else {
      setCount(0);
    }
    setTimer(60)
    setRedBorder("");
    setGreenBorder("");
    setSentSuccess("One time passcode sent successfully");
    setFailureMsg("");
    setOtp(temp as any);
    input0.current.value = "";
    input1.current.value = "";
    input2.current.value = "";
    input3.current.value = "";
    input4.current.value = "";
  };
  return (
    // useContext provider to pass the context states
    <UserContext.Provider
      value={{
        otp,
        setOtp,
        greenBorder,
        setGreenBorder,
        count,
        setCount,
        input0,
        input1,
        input2,
        input3,
        input4,
        redBorder,
        setRedBorder,
        failureMsg,
        setFailureMsg,
        SentSuccess,
        setSentSuccess,
        timer,
        setTimer
      }}
    >
      <div className="card p-1" style={{ margin: "10% 35%" }}>
        <h2 className="mt-2 mb-5" style={{ textAlign: "center" }}>
          Pre-Team Alignment Test
        </h2>
        <button
          type="button"
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={generateOtp}
        >
          Validate OTP
        </button>
        {/* component render */}
        <OtpLayout generateOtp={generateOtp} />
      </div>
    </UserContext.Provider>
  );
};
