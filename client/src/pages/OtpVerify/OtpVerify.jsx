import React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axiosInstance from "../../config";
import "./otpVerify.css"

const OtpVerify = () => {
    const loc = useLocation();
  const path = loc.pathname.split("/")[2];
    const [code, setCode] = useState("")
    const [error, setError] = useState(false);
	const [msg, setMsg] = useState("");
 
    const [id, setId] = useState("");
    const [randomNumber, setRandomNumber] = useState("");

    useEffect(() => {
        const getUser = async () => {
          const res = await axiosInstance.get(`/users/${path}`);
        
          setRandomNumber(res.data.otp)
          setId(res.data._id)
        };
        getUser();

      },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (String(randomNumber)  === String (code) ){
            
            
			const { data: res } = await axiosInstance.put(`/auth/register/${id}`);
			setMsg(res.message); 
            window.location.replace("/");
        }
        else {
            setError(true);
        }
    }
    return (
        <div className="otpVerify d-flex align-items-center justify-content-center">
        {/* {console.log(props)} */}
        {/* {console.log(code)} */}
        {console.log(path)}
        {console.log(randomNumber)}
        {console.log(id)}
        {/* {console.log(error)}  */}
         {/* <button className="close-btn" >close</button> */}
         <div className="otpVerify-body">
        <span className="otpVerify-title">Check your email and enter OTP here!!! </span> <br /> <br />
        <form action="" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="enter your otp code"
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
            />  <br /> <br />
            <div className="text-center md-5">
            <button className="btn btn-outline-primary" type="submit">submit</button>  </div>
         {error && <div>You have enterd an wrong OTP</div>} 
            {msg && <div >{msg}</div>}
        </form> 
        </div>
    </div>
    ) 
};

export default OtpVerify;