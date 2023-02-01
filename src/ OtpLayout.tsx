import React, { useContext, useRef, useState } from "react";
import { UserContext } from "./App";

export const OtpLayout = () => {
  const data = useContext(UserContext);
  const [otp, setOtp] = useState<any>([]);
  const [enteredOtp, setEnteredOtp] = useState<any>([]);
  const [count, setCount] = useState<number>(5);
  const [greenBorder, setGreenBorder] = useState("");
  const [redBorder, setRedBorder] = useState("");
  const input0: any = useRef();
  const input1: any = useRef();
  const input2: any = useRef();
  const input3: any = useRef();
  const input4: any = useRef();
  const sent: any = useRef();
  const generateOtp = (e: React.SyntheticEvent) => {
    let number: any;
    let temp;
    if (count > 1) {
      setCount((prev) => prev - 1);
      number = JSON.stringify(Math.ceil(Math.random() * 100000));
      temp = number.split("");
      for (let i = 0; i < temp.length; i++) {
        if (temp.length < 5) {
          temp.push(Math.ceil(Math.random() * 10));
        }
      }
    } else{
      setCount(0);
      // setOtp(["You have reached your limit"])
    }
    setGreenBorder("");
    // input0.current.focus();
    input0.current.value = "";
    input1.current.value = "";
    input2.current.value = "";
    input3.current.value = "";
    input4.current.value = "";
    setOtp(temp as any);
    // console.log(otp.length);
    console.log(otp);
  };
  const handleInputOtp1 = (e: any) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 9) {
      input1.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      input0.current.value = "";
    }
  };
  const handleInputOtp2 = (e: any) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 9) {
      console.log("Yes");
      input2.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      input1.current.value = "";
    }
  };
  const handleInputOtp3 = (e: any) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 9) {
      console.log("Yes");
      input3.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      input2.current.value = "";
    }
  };
  const handleInputOtp4 = (e: any) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 9) {
      console.log("Yes");
      input4.current.focus();
      enteredOtp.push(e.target.value);
    } else {
      alert("Please enter number between[0-9]");
      input3.current.value = "";
    }
  };
  const handleInputOtp5 = (e: any) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 9) {
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
      for (let i = 0; i < otp.length; i++) {
        if (otp[i] === enteredOtp[i]) {
          setGreenBorder("green-border");
          
        } else setRedBorder("red-border");
      }
    } else {
      alert("Please enter number between[0-9]");
      input4.current.value = "";
    }
  };
  return (
    // Button trigger modal
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={generateOtp}
      >
        Validate OTP
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Verify Email Address({otp})
              </h5>
              {/* Close Button */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Content */}
            <div className="modal-body">
              <p className="card-text">Enter your code here:</p>
              {/* input boxes */}
              <input
                ref={input0}
                className={`input-box ${greenBorder} ${redBorder}`}
                type="number"
                // value={Input1}
                onChange={handleInputOtp1}
              />
              <input
                ref={input1}
                className={`input-box ${greenBorder} ${redBorder}`}
                type="number"
                // value={Input2}
                onChange={handleInputOtp2}
              />
              <input
                ref={input2}
                className={`input-box ${greenBorder} ${redBorder}`}
                type="number"
                // value={Input3}
                onChange={handleInputOtp3}
              />
              <input
                ref={input3}
                className={`input-box ${greenBorder} ${redBorder}`}
                type="number"
                // value={Input4}
                onChange={handleInputOtp4}
              />
              <input
                ref={input4}
                className={`input-box ${greenBorder} ${redBorder}`}
                type="number"
                // value={Input5}
                onChange={handleInputOtp5}
              />
            </div>
            {/* Modal Footer */}
            {/* <div className="modal-footer"> */}
            <div className="card-header">
              <p style={{ color: "red" }} id="wrong">
                Enter One-time passcode is incorrect
              </p>
              <p style={{ color: "green" }} ref={sent}>
                One-time passcode sent successfully!!!
              </p>
              <a href="#0" style={{ textAlign: "left" }} onClick={generateOtp}>
                Resend one-time-passcode
              </a>
              ({count} attempts left)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
