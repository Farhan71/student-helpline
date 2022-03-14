import React from 'react';
// import Register from '../register/Register';
import "./landingPage.css"
// import { useState } from 'react';
// import Login from '../login/Login';
import { Link } from "react-router-dom";

const LandingPage = () => {
    
    return (
        <div>
           <main className="landing-page">
               
               <div className="banner d-flex align-items-center justify-content-center ">
                   <div className="banner-text text-center ">
                       <h4 style={{fontWeight:"bold"}}>WELCOME TO</h4> 
                   <h1 style={{fontWeight:"bold", fontSize:"40px"}}>STUDENT HELPLINE</h1>  
                   <h6 style={{fontWeight:"bold"}}>A ONE STOP SOLUTION TO FULLFILL YOUR NEEDS </h6> 
                   </div>
               
               </div>

               <div className="container landing-middle">
                   <div className="row">
                       <div className="col-md-4">       
                        <div className="card" style={{width: "250px"}}>
                                <div className="card-body text-center">
                                         <div className="icon">
                                         <i className="fa-solid fa-user-plus"></i>
                                         </div>
                                        <h5 className="card-title" style={{fontSize:"20px"}}>Register, verify and login</h5> <br />
                                        <p className="card-text">Register with your valid Edu-mail, check your mail for otp, verify mail and login. Help us to buid a secure environment.</p>
                                </div>
                            </div>                    
                        </div>


                       <div className="col-md-4">
                       <div className="card" style={{width: "250px"}}>
                                <div className="card-body text-center">
                                <div className="icon">
                                <i class="fa-solid fa-list"></i>
                                         </div>
                                        <h5 className="card-title" style={{fontSize:"20px"}}> Interact in six different categories</h5> <br />
                                        <p className="card-text">Post and comment in six different categories. You can also sort and filter postings by different parameters.</p> 
                                </div>
                            </div>              
                        </div>


                       <div className="col-md-4">
                       <div className="card" style={{width: "250px"}}>
                                <div className="card-body text-center">
                                <div className="icon">
                                <i class="fa-solid fa-circle-question"></i>
                                         </div>
                                        <h5 className="card-title" style={{fontSize:"20px"}}> Stuck? Don't hesitate to contact with us</h5> <br />
                                        <p className="card-text">Contact us via sending message from contact page. We eagerly wait to help you whatever your problem would be.  </p>
                                </div>
                            </div>    
                        </div>
                    </div>
               </div>
                <div className="landing-last">
                    <div className="container text-center">

                    
                        <h1>How It Works</h1>
                        <p>This is a web application enabling university students to interact with each other to meet their different day-to-day demands other than academic requirements. A university student moves to a new town from another city, district, or even country for a term of at least four years. As a result, a new student faces a variety of daily living issues, such as finding cheap housing, purchasing books and accessories, donating blood and so on, and it might be difficult for them to discover all of this information in their new location. Again, entrepreneurs need to publish to promote their products, while student journalists need to show a variety of articles. An online application that provides an one-stop solution for accessing this information will assist students in making their lives easier and more comfortable, allowing them to focus on their academics. It reduces reliance on social media groups for such needs. This program allows students to assist one another, resulting in a more effective student community helpdesk platform. As a result, such a web application will increase data access and service quality while also reducing effort and time. </p>
                    </div>
                </div>
               
            </main>    
            
        </div>
    );
};

export default LandingPage;