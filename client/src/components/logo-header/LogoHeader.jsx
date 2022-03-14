import React from 'react';
import "./logoHeader.css";
import logo from '../../images/logo.png';

const LogoHeader = () => {
    return (
        <div style={{padding: '2px'}}>
        <div className="container">
            <div className="row">
    <div className="col-md-6 d-flex justify-content-start">
    <img src={logo} className="navbar-brand" alt="" />
    <div>
        <h6>Student Helpline</h6> 
        <h6>One Stop Solution</h6>
    </div>
    
    </div>
    <div className="col-md-6 icon-style d-flex justify-content-end ">
    <p>Follow Us</p>   &nbsp;  &nbsp;  &nbsp;
    <div>

    
      <a href=""><i className="fa-brands fa-facebook-square"></i></a>
      <a href=""><i className="fa-brands fa-twitter-square"></i></a>
      <a href=""><i className="fa-brands fa-instagram-square"></i></a>
      <a href=""><i className="fa-brands fa-linkedin"></i></a>
      <a href=""><i className="fa-brands fa-pinterest-square"></i></a>
      <a href=""><i className="fa-brands fa-google-plus-square"></i></a>
      </div>
    </div>
  </div>
        </div>
        
            {/* <hr className="horizontal-line" /> */}
        
        </div>
    );
};

export default LogoHeader;