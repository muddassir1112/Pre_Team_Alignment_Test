import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Register";
export const OtpLayout = (props: any) => {
  const data = useContext(UserContext);
  const time = useContext(UserContext)
  const [enteredOtp, setEnteredOtp] = useState<any>([]);
  // const [timer, setTimer] = useState<number>(60);
  const [flag, setFlag] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  // const [display, setDisplay] = useState<string>("");

  // useEffect Hook used to start the timer and show success notification
  useEffect(() => {
    // for timer
    if (time.timer >= 0) {
      setTimeout(() => {
        time.setTimer((prev:number) => prev - 1);
      }, 1000);
    } else time.setTimer(0);
    if (data.timer === 0) {
      time.setTimer(0);
      setButtonStatus(false);
    }
    // condition to hide the success notification
    setTimeout(() => {
      data.setSentSuccess("");
    }, 3000);
  }, [time.timer]);

  // useEffect to focus first input box
  useEffect(() => {
    data.input0.current.focus();
  }, []);  
 
  // function to handle the first input from the box
  const handleInputOtp1 = (e: any) => {
    // validations
    if (e.target.value === "") {
      data.input0.current.focus();
    } else if (e.target.value >= 0 && e.target.value <= 9) {
      data.input1.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      data.input0.current.value = "";
    }
  };

  // function to handle the second input from the box
  const handleInputOtp2 = (e: any) => {
    // validations
    if (e.target.value === "") {
      data.input0.current.focus();
      console.log("Blank");
    } else if (e.target.value >= 0 && e.target.value <= 9) {
      data.input2.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      data.input1.current.value = "";
    }
  };

  // function to handle the third input from the box
  const handleInputOtp3 = (e: any) => {
    // validations
    if (e.target.value === "") {
      data.input1.current.focus();
    } else if (e.target.value >= 0 && e.target.value <= 9) {
      data.input3.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      data.input2.current.value = "";
    }
  };
  // function to handle the fourth input from the box
  const handleInputOtp4 = (e: any) => {
    // validation
    if (e.target.value === "") {
      data.input2.current.focus();
    } else if (e.target.value >= 0 && e.target.value <= 9) {
      data.input4.current.focus();
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
    } else {
      alert("Please enter number between[0-9]");
      data.input3.current.value = "";
    }
  };

  // function to handle the fifth input from the box
  const handleInputOtp5 = (e: any) => {
    // validation
    if (e.target.value === "") {
      data.input3.current.focus();
    } else if (e.target.value >= 0 && e.target.value <= 9) {
      enteredOtp.push(e.target.value);
      setEnteredOtp([...enteredOtp]);
      for (let i = 0; i < data.otp.length; i++) {
        if (data.otp[i] === enteredOtp[i]) {
          data.setGreenBorder("green-border");
          data.input4.current.blur();
          // to hide the modal from the UI after given time
          setTimeout(() => {
            // setDisplay("none");
            window.location.reload();
          }, 1000);
        } else {
          setFlag(true);
          data.setRedBorder("red-border");
          data.setFailureMsg("Entered One time passcode is incorrect");
          data.input4.current.blur();
        }
      }
    } else {
      alert("Please enter number between[0-9]");
      data.input4.current.value = "";
    }
  };
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // style={{ display: display }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Verify Email Address({data.otp})
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
                ref={data.input0}
                className={`input-box ${data.greenBorder} ${data.redBorder}`}
                type="text"
                maxLength={1}
                onChange={handleInputOtp1}
              />
              <input
                ref={data.input1}
                className={`input-box ${data.greenBorder} ${data.redBorder}`}
                type="text"
                maxLength={1}
                onChange={handleInputOtp2}
              />
              <input
                ref={data.input2}
                className={`input-box ${data.greenBorder} ${data.redBorder}`}
                type="text"
                maxLength={1}
                onChange={handleInputOtp3}
              />
              <input
                ref={data.input3}
                className={`input-box ${data.greenBorder} ${data.redBorder}`}
                type="text"
                maxLength={1}
                onChange={handleInputOtp4}
              />
              <input
                ref={data.input4}
                className={`input-box ${data.greenBorder} ${data.redBorder}`}
                type="text"
                maxLength={1}
                onChange={handleInputOtp5}
              />
            </div>
            {/* Modal Footer */}
            <div className="card-header">
              {/* Notification section */}
              <p style={{ color: "green" }}>{data.SentSuccess}</p>
              {/* conditional rendering to show if the password does not match */}
              {flag ? <p style={{ color: "red" }}>{data.failureMsg}</p> : null}
              {/* resend passcode button */}
              <button
                className="btn-light resend"
                style={{ border: "none" }}
                onClick={props.generateOtp}
                disabled={buttonStatus}
              >
                Resend one-time-passcode
              </button>
              &nbsp;&nbsp;&nbsp;
              {/* remaining attemps left section */}
              <span className="text-muted">({data.count} attempts left)</span>
              {/* timer */}
              <span className="float-end" style={{ color: "red" }}>
                00:{time.timer}
              </span>
            </div>
            {/* Modal Footer Closed */}
          </div>
        </div>
      </div>
    </>
  );
};
