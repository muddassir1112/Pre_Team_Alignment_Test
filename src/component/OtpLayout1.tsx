import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../App";

export const OtpLayout1 = () => {
  const data = useContext(UserContext);
  const [refs, setRefs] = useState<any>([]);
  const divref:any = useRef();
  // let refsArray:any;
  useEffect(() => {
    for (let i = 0; i < data.otp.length; i++) {
      refs.push(React.createRef());
    }
    setRefs([...refs]);
    divref.current.addEventListener("shown.bs.modal", function () {
          refs[0].current.focus();
        });
    console.log(refs);
  }, [data.otp.length]);
  console.log(data.otp);
  const handleInputOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
   console.log(refs[0].current.value)
   console.log(refs)
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
              {refs.map((ele: string, index: number) => (
                <input
                  key={index}
                  // ref={elementsRef.current[index]}
                  ref={ele}
                  // className={`input-box ${data.greenBorder} ${data.redBorder}`}
                  className="input-box"
                  type="text"
                  maxLength={1}
                  onChange={handleInputOtp}
                />
              ))}
            </div>
            {/* Modal Footer */}
            <div className="card-header">
              {/* Notification section */}
              {/* <p style={{ color: "green" }}>{data.SentSuccess}</p> */}
              {/* conditional rendering to show if the password does not match */}
              {/* resend passcode button */}
              <button className="btn-light resend" style={{ border: "none" }}>
                Resend one-time-passcode
              </button>
              &nbsp;&nbsp;&nbsp;
              {/* remaining attemps left section */}
              {/* <span className="text-muted">({data.count} attempts left)</span> */}
              {/* timer */}
              {/* <span className="float-end" style={{ color: "red" }}>
                00:{time.timer}
              </span> */}
            </div>
            {/* Modal Footer Closed */}
          </div>
        </div>
      </div>
    </>
  );
};
