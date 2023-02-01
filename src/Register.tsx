import React from "react";

import { OtpLayout } from "./ OtpLayout";


export const Register = () => {
 
  return (
    <div className="card" style={{ width: "25rem" }}>
      {/* <button className="layout_btn" onClick={generateOtp}> */}
        <OtpLayout/>
      {/* </button> */}
    </div>
  );
};
