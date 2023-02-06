import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { UserContext } from "../App";
import { OtpLayout1 } from "./OtpLayout1";

export const Register1 = () => {
  const data = useContext(UserContext);
  const inputDigitRef = React.useRef<HTMLInputElement>(null!);
  const regexInput = /^[4-7\b]+$/;
  let random: string[];
  useEffect(() => {
    inputDigitRef.current.focus();
  }, []);
  const generateOTPhandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (data.inputDigit === "") {
      alert("Please Enter Number of Digit");
    } else if (regexInput.test(data.inputDigit) === true) {
      //   alert("Yes");
      if (data.inputDigit === "4") {
        generateOTP(9000, 1000);
        console.log(random);
      } else if (data.inputDigit === "5") {
        generateOTP(99999, 10000);
        console.log(random);
      } else if (data.inputDigit === "6") {
        generateOTP(999999, 100000);
        console.log(random);
      } else if (data.inputDigit === "7") {
        generateOTP(9999999, 1000000);
        console.log(random);
      }
    } else {
        inputDigitRef.current.value = ""
        alert("Please Enter Number Between [4-7]")};
  };
  const generateOTP = (max: number, min: number) => {
    random = Math.floor(Math.random() * max + min)
      .toString()
      .split("");
    data.setOtp(random);
    return random;
  };
  return (
    <>
      <div className="card p-1" style={{ margin: "10% 35%" }}>
        <h2 className="mt-2 mb-5" style={{ textAlign: "center" }}>
          Pre-Team Alignment Test
        </h2>
        {/* <form onSubmit={generateOTPhandler}> */}
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
          onClick={generateOTPhandler}
        >
          Validate OTP
        </button>
        {/* </form> */}
        {/* component render */}
        {Number(data.inputDigit) >= 4 && Number(data.inputDigit) <= 7 ? (
          <OtpLayout1 />
        ) : null}
      </div>
    </>
  );
};
