import "./header.css";
import { useEffect, useState } from "react";
import header3 from "../../images/blue-sky-white-clouds-natural-26.jpg"
import {Carousel } from 'react-bootstrap';
import header1 from "../../images/banner-top-view-laptop-keyboard-.jpg"
import header2 from "../../images/wide-view-image-businessman-prog.jpg"

export default function Header() {
  


  return (
    // <div className="header container">
    //   <div className="headerTitles">


    //   </div>
     
    // </div>

    
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={header1} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        
        <h1>Student Helpline</h1>
        <p>Need any help? Just check and post.</p>
        
        
      </div>
    </div>
    <div className="carousel-item">
      <img src={header2} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h1>One Stop Solution</h1>
        <p>Make life easier by posting under 6 categories in a secure environment.</p> 
      </div>
    </div>
    <div className="carousel-item">
      <img src={header3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h1>Sky is the limit</h1>
        <p>Help others and make a better world.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    
    
    
  );
}
