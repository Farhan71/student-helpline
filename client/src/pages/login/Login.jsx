import axiosInstance from "../../config";
import { useContext, useRef } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return  (
    <div className="d-flex align-items-center justify-content-center login">
      <div className="login-body"> 
      <span className="login-title">Login</span> <br />
      <form  onSubmit={handleSubmit}>
        {/* <label>Username</label> */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter your email..."
          ref={emailRef}
        /> <br />
        {/* <label>Password</label><br /> */}
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password..."
          ref={passwordRef}
        /> <br />
        <div className="text-center md-5">
        <button className="btn btn-outline-primary " type="submit" disabled={isFetching}>
          Login
        </button>
        </div>
      </form> 
      {/* <p>Don't have an account?</p> */}
      {/* <button>
        <Link className="link" to="/register">
          Register Here
        </Link>
      </button> */}
    </div>
    </div>
  ) 
}
export default Login
