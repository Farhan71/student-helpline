import {axiosInstance} from "../../config";
import { useState, useEffect } from "react";
import OtpVerify from "../OtpVerify/OtpVerify";
import { Link } from "react-router-dom";
import "./register.css";

const Register =() =>{
  
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [studentId, setStudentId] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isDonor, setIsDonor] = useState("");
  const [isEntrepreneur, setIsEntrepreneur] = useState("");
  const [isReporter, setIsReporter] = useState("");

  const [error, setError] = useState(false);

  


  useEffect (() => {
    const getValidUsers = async () => {
      
      const res = await axiosInstance.get(`/validUsers/?email=${email}`);
      console.log(res.data)
      setValidEmail(res.data)
    };
    getValidUsers();
  },[email]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
        // setError(false);
     
        
        const res = await axiosInstance.post("auth/register/verifyOTP", {
          username,
          email,
          password,
          contact,
          studentId,
          bloodGroup,
          isDonor, isEntrepreneur, isReporter
        })
        setId(res.data._id)
        console.log(res.data)
        // window.location.replace(`/otpVerify/${id}`);
        // console.log(res.data._id)
      
    } 
    catch (err) {
      setError(true);
    }
  };

  return ( 
    <>
    
      <div className="d-flex align-items-center justify-content-center register">
      
      <div className="register-body" >
        {/* <button className="close-btn" >close</button> */}

<span className="register-title">Register</span>
<form  onSubmit={handleSubmit}>
 
   {/* <label>Username</label> &nbsp; */}
 <input
   
   type="text"
   className=" form-control"
   placeholder="Enter your username..."
   onChange={(e) => setUsername(e.target.value)}
 /> 
    <br /> <br />

   {/* <label>Email</label> &nbsp; */}
 <input
   type="text"
   placeholder="Enter your email..."
   className="form-control"
   onChange={(e) => setEmail(e.target.value)}
   // onChange={(e) => 
   //   { var split = e.target.value.split('@')
   //   var domain = split[1]
   //   if (String(domain) ==="student.nstu.edu.bd") {
   //     setError(false)
   //     setEmail(e.target.value)
   //   } else {
   //     setError(true)
   //   }}
   // }
 /> <br /><br />
  
 {/* <label >Contact Number</label> &nbsp; */}
 <input
   type="text"
   placeholder="Enter your contact number..."
   className="form-control"
   onChange={(e) => setContact(e.target.value)}
 /> <br /> <br />

 {/* <label >Student ID</label> &nbsp; */}
 <input
   type="text"
   placeholder="Enter your student ID..."
   onChange={(e) => setStudentId(e.target.value)}
   className="form-control"
 /> <br /> <br />

{/* <label>Password</label> &nbsp; */}
 <input
   type="password"
   placeholder="Set a strong password"
   onChange={(e) => setPassword(e.target.value)}
   className="form-control"
 /> <br /> <br />

 {/* <label>Blood Group</label> &nbsp; */}

 <label for="">Select your blood group : </label> &nbsp;
 
 <select  onChange={(e) =>  {setBloodGroup(e.target.value)}} name="" id="">
                      
                      <option value="A Positive">A+</option>
                      <option value="A Negative">A-</option>
                      <option value="B Positive">B+</option>
                      <option value="B Negative">B-</option>
                      <option value="AB Positive">AB+</option>
                      <option value="AB Negative">AB-</option>
                      <option value="O Positive">O+</option>
                      <option value="O Negative">O-</option>
                    </select> 
                    

 {/* <input
   type="text"
   className="registerInput"
   placeholder="A+/A-/B+/B-/O+/O-"
   onChange={(e) => setBloodGroup(e.target.value)}
 />  */}
 
 <br /> <br />

 <span > Are you a Blood Donor?</span> &nbsp;
 
 <label className="form-check-label" for="yes">
 <input className="form-check-input" type="radio" name="blood" value="Yes" id="yes" onChange={(e) =>  {setIsDonor(e.target.value)}}></input>Yes</label> &nbsp;
 
 <label className="form-check-label" for="no">
 <input className="form-check-input" type="radio" name="blood" value="No" id="no" onChange={(e) =>  {setIsDonor(e.target.value)}}></input>No</label>
 {/* <select onChange={(e) =>  {setIsDonor(e.target.value)}} name="" id="">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      </select>  */}


 {/* <input
   type="text"
   className="registerInput"
   placeholder="Are you a Blood Doner? Type Yes or No"
   onChange={(e) => setIsDonor(e.target.value)}
 />  */}
 
 <br /> <br />

 <span>Are you a Entrepreneur?</span>  &nbsp;

 <label className="form-check-label" for="yes">
 <input type="radio" className="form-check-input" name="entrepreneur" value="Yes" id="yes" onChange={(e) =>  {setIsEntrepreneur(e.target.value)}}></input>Yes</label> &nbsp;
 
 <label className="form-check-label" for="no">
 <input type="radio" className="form-check-input" name="entrepreneur" value="No" id="no" onChange={(e) =>  {setIsEntrepreneur(e.target.value)}}></input>No</label>

 {/* <select onChange={(e) =>  {setIsEntrepreneur(e.target.value)}} name="" id="">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      </select>  */}
 {/* <input
   type="text"
   className="registerInput"
   placeholder="Are you a Entrepreneur? Type Yes or No"
   onChange={(e) => setIsEntrepreneur(e.target.value)}
 />  */}
 
 <br /> <br />

<span>Are you a Reporter?</span>  &nbsp;

<label className="form-check-label" for="yes">
 <input className="form-check-input" type="radio" name="reporter" value="Yes" id="yes" onChange={(e) =>  {setIsReporter(e.target.value)}}></input>Yes</label> &nbsp;
 
 <label className="form-check-label" for="no">
 <input className="form-check-input" type="radio" name="reporter" value="No" id="no" onChange={(e) =>  {setIsReporter(e.target.value)}}></input>No</label>


{/* <select onChange={(e) =>  {setIsReporter(e.target.value)}} name="" id="">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      </select>  */}
 {/* <input

 {/* <input
   type="text"
   className="registerInput"
   placeholder="Are you a Reporter? Type Yes or No"
   onChange={(e) => setIsReporter(e.target.value)}
 />  */}
 
 <br /> <br /> <br />

 <div className="text-center md-5">

 { validEmail ?  <button style={{width:"120px"}} type="submit" className="btn btn-outline-primary" >Register</button> : <h6>Enter your valid Edu-mail ID and get register button </h6> }
 {/* { validEmail &&  <button style={{width:"120px"}} type="submit" >Register</button> } */}

 </div>


{error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong! May be your email is not valid or you put data on wrong format or you miss to put data </span>} <br /> <br />
 {id &&  <h6 style={{fontSize: "12px"}}>An email with an OTP has already been sent to your account. Please, <Link className="b" style={{fontSize: "15px"}} to={`/otpVerify/${id}`}>CLICK HERE</Link> to varify your email by that OTP.  </h6>}
</form>

</div>
    
    </div>
   
    
    </>
  
     
  );
};
export default Register; 
