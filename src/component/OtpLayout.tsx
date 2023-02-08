import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../App";

export const OtpLayout = (props: any) => {
  // contexts
  const data = useContext(UserContext);
  // array state to print input boxes
  const [refs, setRefs] = useState<any>([]);
  // array state to hold the inputs
  const [otpArray, setOtpArray] = useState<string[]>([]);
  // state to disable the button
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  // state to set notification
  const [Notification, setNotification] = useState<string>("");
   // state for timer
   const [counter, setCounter] = useState(60);
   // state for attempts
   const [attempts, setAttempts] = useState<any>(4);
   //state for success msg
   const [sentOtpAgain, setSentOtpAgain] = useState("");
   // loader state
   const [loader, setLoader] = useState("none");
  // ref to open the modal with focus on first input
  const divref: any = useRef();
  // regex expression for input values
  const regexInput = /^[0-9\b]+$/;
 
  // useEffect Hook
  useEffect(() => {
    // function call to generate the otp
    props.generateOTPhandler();
    // to print the input boxes as per user input
    for (let i = 0; i < Number(data.inputDigit); i++) {
      refs.push(createRef());
      otpArray.push(" ");
    }
    setOtpArray([...otpArray]);
    setRefs([...refs]);
    divref.current.addEventListener("shown.bs.modal", function () {
      refs[0].current.focus();
    });
  }, [data.inputDigit]);
  // useEffect Hook for timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setButtonStatus(false);
      setCounter(0);
    }
  }, [counter]);
  // function to handle entered otp
  const handleInputOtp = (item: any, index: number) => {
    if (regexInput.test(refs[index].current.value)) {
      if (refs[index].current.value !== "") {
        otpArray.splice(index, 1, refs[index].current.value);
        setOtpArray([...otpArray]);
        checkOtp();
        refs[index].current.nextSibling.focus();
      }
    } else refs[index].current.value = "";
  };
  // function to handle delete input
  const handleDeleteOtp = (item: any, e: any, index: number) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      item.current.value === ""
    ) {
      otpArray.splice(index, 1, " ");
      setOtpArray([...otpArray]);
      item.current.previousSibling.focus();
      setNotification("");
    }
    checkOtp();
  };
  // function to send resend otp
  const resendOTP = () => {
    if (attempts > 0) {
      setAttempts((prev: any) => prev - 1);
      for (let i = 0; i < refs.length; i++) {
        refs[i].current.value = "";
        otpArray[i] = " ";
      }
      setOtpArray([...otpArray]);
      setCounter(60);
      setButtonStatus(true);
      setSentOtpAgain("One time passcode sent successfully");
      setNotification("");
      refs[0].current.focus();
      props.generateOTPhandler();
    } else {
      setNotification("");
      setSentOtpAgain("You have reached your limit");
      setButtonStatus(true);
      setAttempts(0);
    }
  };
  // function to check the otp
  const checkOtp = () => {
    if (JSON.stringify(data.otp) === JSON.stringify(otpArray)) {
      setNotification("Otp Matched");
      setSentOtpAgain("");
      setLoader("block");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (
      JSON.stringify(data.otp) !== JSON.stringify(otpArray) &&
      JSON.stringify(otpArray).includes(" ") === false
    ) {
      setSentOtpAgain("");
      setNotification("Entered one time passcode is incorrect");
    } else {
      setNotification("");
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        ref={divref}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {" "}
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
              {refs.map((ele: string, index: any) => (
                <input
                  key={index}
                  ref={ele}
                  className={`input-box ${
                    Notification === "Entered one time passcode is incorrect"
                      ? "red-border"
                      : Notification === ""
                      ? ""
                      : "green-border"
                  }`}
                  type="text"
                  maxLength={1}
                  onKeyDown={(e: any) => handleDeleteOtp(ele, e, index)}
                  onChange={() => handleInputOtp(ele, index)}
                />
              ))}
              {/* Loader */}
              <span className="float-end" style={{ display: loader }}>
                <div
                  className="spinner-border ms-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </span>
            </div>
            {/* Modal Footer */}
            <div className="card-header">
              {/* Notification section */}
              {sentOtpAgain !== "" ? (
                <p style={{ color: "green" }}>{sentOtpAgain}</p>
              ) : null}
              {Notification === "Entered one time passcode is incorrect" ? (
                <p style={{ color: "red" }}>{Notification}</p>
              ) : null}
              {/* resend passcode button */}
              <button
                className="btn-light resend"
                style={{ border: "none" }}
                onClick={resendOTP}
                disabled={buttonStatus}
              >
                Resend one-time-passcode
              </button>
              &nbsp;&nbsp;&nbsp;
              {/* remaining attemps left section */}
              <span className="text-muted">({attempts} attempts left)</span>
              {/* timer */}
              <span className="float-end" style={{ color: "red" }}>
                <p>
                  00:
                  {counter < 10 ? `0${counter}` : <>{counter}</>}
                </p>
              </span>
            </div>
            {/* Modal Footer Closed */}
          </div>
        </div>
      </div>
    </>
  );
};
