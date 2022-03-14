import React from 'react';
import "./unregisterdNav.css"
import { Link } from "react-router-dom";

const UnregisteredNav = () => {
    return (

        
              

        <div className="unregisterdNav">
            <ul className="container nav justify-content-end">
  <li className="nav-item">
    
    <Link className="nav-link active" to="/register">Register Here</Link>
  </li>
  <li className="nav-item">
    
    <Link className="nav-link" to="/login">Login Here</Link>
  </li>
</ul>
        </div>
    );
};

export default UnregisteredNav;