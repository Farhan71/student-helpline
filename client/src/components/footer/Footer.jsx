import React from 'react';
import "./footer.css"

const footer = () => {
  
    return (
        <>
        

<footer className="footer-distributed">

			<div className="footer-left">

				
        <img className="navbar-brand"  src="static/media/logo.9d49eb21.png" alt="" />

				<p className="footer-links">
					<a href="#" className="link-1">Home</a>
					
					<a href="#">Settings</a>
				
					<a href="#">Help</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p className="footer-company-name">Student Helpline © 2022</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>Sonapur-3814</span> Noakhali, Chittagong </p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+880-197453309</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About the company</span>
					One stop solution student community platform
				</p>

				<div className="footer-icons">

					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>

				</div>

			</div>


		</footer>
    
    <div className="last-footer" >
<h6 >Copyright © 2022 | Noakhali Science and Technology University | All Rights Reserved</h6>

    </div>
    
  </>

    );
};

export default footer;