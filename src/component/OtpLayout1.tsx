import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../App";

export const OtpLayout1 = (props: any) => {
  const data = useContext(UserContext);
  const timer = useContext(UserContext);
  const [refs, setRefs] = useState<any>([]);
  const [otpArray, setOtpArray] = useState<string[]>([]);
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);

  const divref: any = useRef();
  const regexInput = /^[0-9\b]+$/;
  console.log("attempts:", data.count);
  useEffect(() => {
    for (let i = 0; i < data.inputDigit; i++) {
      refs.push(React.createRef());
    }
    setRefs([...refs]);
    divref.current.addEventListener("shown.bs.modal", function () {
      refs[0].current.focus();
    });
  }, [data.inputDigit]);
  useEffect(() => {
    if (timer.counter > 0) {
      setTimeout(() => timer.setCounter(timer.counter - 1), 1000);
    } else {
      setButtonStatus(false);
      timer.setCounter(0);
    }
  }, [data.otp,timer]);
  // function to handle entered otp
  const handleInputOtp = (item: any, index: number) => {
    if (refs[index].current.value !== "") {
      if (index < data.otp.length - 1) {
        otpArray.splice(index, 1, refs[index].current.value);
        setOtpArray([...otpArray]);
        checkOtp();
        refs[index].current.nextSibling.focus();
      } else {
        checkOtp();
        refs[index].current.focus();
      }
    } else if (item.current.value === "") {
      item.current.value = "";
    }
  };
  // function to handle delete input
  const handleDeleteOtp = (item: any, e: any, index: number) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      item.current.value === ""
    ) {
      otpArray.splice(index, 1, item.current.value);
      setOtpArray([...otpArray]);
      item.current.previousSibling.focus();
    }
  };
  // function to send resend otp
  const resendOTP = () => {
    // e.preventDefault();
    if (data.count > 0) {
      setButtonStatus(true);
      props.generateOTPhandler();
      // setCounter(15);
    } else {
      setButtonStatus(true);
      // setCounter(0);
    }
  };
  // function to check the otp
  const checkOtp = () => {
    if (JSON.stringify(data.otp) === JSON.stringify(otpArray)) {
      alert("MAtch");
    } else alert("Not Match");
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
                  // className = "current"
                  className={`input-box ${data.greenBorder} ${data.redBorder}`}
                  // className="input-box"
                  type="text"
                  maxLength={1}
                  onKeyDown={(e: any) => handleDeleteOtp(ele, e, index)}
                  onChange={() => handleInputOtp(ele, index)}
                />
              ))}
            </div>
            {/* Modal Footer */}
            <div className="card-header">
              {/* Notification section */}
              {/* <p style={{ color: "green" }}>{data.SentSuccess}</p> */}
              {/* conditional rendering to show if the password does not match */}
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
              <span className="text-muted">({data.count} attempts left)</span>
              {/* timer */}
              <span className="float-end" style={{ color: "red" }}>
                <p>
                  00:
                  {timer.counter < 10 ? (
                    `0${timer.counter}`
                  ) : (
                    <>{timer.counter}</>
                  )}
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
