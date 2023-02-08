import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { OtpLayout } from "./OtpLayout";

export const Register = () => {
  const data = useContext(UserContext); //useContext Hook
  const inputDigitRef = React.useRef<HTMLInputElement>(null!);
  const regexInput = /^[4-7\b]+$/; //regex expression for user input digit
  //temporary variable to store the random number
  let random: string[];
  // useEffect Hook to focus on input box
  useEffect(() => {
    inputDigitRef.current.focus();
  }, []);
  // function to check to generate the random number as per user input
  const generateOTPhandler = (e: React.SyntheticEvent) => {
    if (data.inputDigit === "4") {
      generateOTP(9000, 1000);
    } else if (data.inputDigit === "5") {
      generateOTP(99999, 10000);
    } else if (data.inputDigit === "6") {
      generateOTP(999999, 100000);
    } else if (data.inputDigit === "7") {
      generateOTP(9999999, 1000000);
    } else return;
  };
  // function to generate the random number
  const generateOTP = (max: number, min: number) => {
    random = Math.floor(Math.random() * max + min)
      .toString()
      .split("");
    data.setOtp(random);
    return random;
  };
  // validation for taking valid user input
  const checkDigit = () => {
    if (data.inputDigit === "" || !regexInput.test(data.inputDigit)) {
      alert("Please Enter Number Between [4-7]");
      inputDigitRef.current.value = "";
      inputDigitRef.current.focus();
    } else return;
  };
  return (
    <>
      <div className="card p-1" style={{ margin: "10% 35%" }}>
        <h2 className="mt-2 mb-5" style={{ textAlign: "center" }}>
          Pre-Team Alignment Test
        </h2>
        <label htmlFor="digits">
          Enter Number of Digits of OTP :
          <input
            ref={inputDigitRef}
            className="input-box"
            type="text"
            maxLength={1}
            style={{ width: "10%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              data.setInputDigit(e.target.value)
            }
          />
        </label>
        <button
          type="button"
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={checkDigit}
        >
          Validate OTP
        </button>
        {/* component render */}
        {Number(data.inputDigit) >= 4 && Number(data.inputDigit) <= 7 ? (
          <OtpLayout generateOTPhandler={generateOTPhandler} />
        ) : null}
      </div>
    </>
  );
};
