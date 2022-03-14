import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import logo from '../../images/logo.png'
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://student-helpline-blog.herokuapp.com/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className=" navbar navbar-expand-lg " style={{paddingTop:"0px", paddingBottom:"0px"}}>
  <div className="container">
    {/* <img src={logo} className="navbar-brand" alt="" /> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
      <i class="fas fa-bars" style={{color:"#fff", fontSize:"28px"}}></i>
        </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">

         <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              HOME
            </Link>
          </li>
        
          <li className="nav-item">
            <Link className="nav-link"  to="/about">
              About
            </Link>
          </li>

         <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"  to="/">
            Categories
            </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link className="dropdown-item" to="/accommodation">Accomodation</Link></li>
            <li><Link className="dropdown-item" to="/">RecycleBin &raquo;</Link>
                <ul className="dropdown-menu dropdown-submenu">
                  <li><Link className="dropdown-item" to="/book">Books</Link></li>
                  <li><Link className="dropdown-item" to="/accessories">Accessories</Link></li>
                </ul>
            </li>
            <li><Link className="dropdown-item" to="/blood">Blood Finding</Link></li>
            <li><Link className="dropdown-item" to="/entrepreneur">Entrepreneur</Link></li>
            <li><Link className="dropdown-item" to="/reports">Reporters</Link></li>
          </ul>
        </li>

      
          <li className="nav-item" onClick={handleLogout}>
            {user && <Link className="nav-link"  to="/">
              Logout
            </Link>}
          </li>

          {user ? (
            <li className="nav-item">
                <Link  className="nav-link" to="/settings">
                {user.profilePic ? <img className="topImg" src={PF+user.profilePic} alt="" /> : <img className="topImg" src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"} alt="" /> }
            
          </Link>
            </li>
          
        ) : (
          < >
           
          </>
        )}
        
      </ul>
     
    </div>
  </div>
</nav>







    
  );
}
