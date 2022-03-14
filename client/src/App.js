// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Footer from "./components/footer/Footer.jsx"
// import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import AccPage from "./pages/categories/accomodation/AccPage";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import AccSinglePost from "./pages/categories/accomodation/AccSinglePost";
import BookPage from "./pages/categories/book/BookPage";
import BookSinglePost from "./pages/categories/book/BookSinglePost";
import Profile from "./pages/profile/Profile";
import LandingPage from "./pages/landingPage/LandingPage";
import Contact from "./pages/contact/Contact.jsx";
import OtherThingsPage from "./pages/categories/otherThings/OtherThingsPage";
import OtherThingsSinglePost from "./pages/categories/otherThings/OtherThingsSinglePost";
import BldPage from "./pages/categories/blood/BldPage";
import BldSinglePost from "./pages/categories/blood/BldSinglePost";
import EntPage from "./pages/categories/entrepreneur/EntPage";
import EntSinglePost from "./pages/categories/entrepreneur/EntSinglePost";
import RptPage from "./pages/categories/reports/RptPage";
import RptSinglePost from "./pages/categories/reports/RptSinglePost";
import accFilter from "./pages/categories/accomodation/accFilter";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import OtpVerify from "./pages/OtpVerify/OtpVerify";
import LogoHeader from "./components/logo-header/LogoHeader";
import UnregisteredNav from "./components/unregistred-nav/UnregisteredNav";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <LogoHeader></LogoHeader> 
      {
        user ? <TopBar /> : <UnregisteredNav></UnregisteredNav>
      }
      
      <Switch>
        <Route exact path="/">{user ? <Home /> : <LandingPage/>}</Route>
        <Route path="/register"> <Register/></Route>
        <Route path="/login"> <Login/></Route>
        <Route path="/about"> <LandingPage/></Route>
        <Route path="/otpVerify/:id"> <OtpVerify></OtpVerify></Route>
        <Route path="/write">{user ? <Write /> : <LandingPage/>}</Route>
        <Route path="/contact">{user ? <Contact /> : <LandingPage/>}</Route>
        <Route path="/settings">{user ? <Settings /> : <LandingPage/>}</Route>
        <Route path="/accommodation">{user ? <AccPage /> : <LandingPage/>}</Route>
        <Route path="/accessories">{user ? <OtherThingsPage/> : <LandingPage/>}</Route>
        <Route path="/blood">{user ? <BldPage /> : <LandingPage/>}</Route>
        <Route path="/book">{user ? <BookPage /> : <LandingPage/>}</Route>
        <Route path="/reports">{user ? <RptPage/> : <LandingPage/>}</Route>
        <Route path="/entrepreneur">{user ? <EntPage />: <LandingPage/>}</Route>
        {/* <Route path="/books">{user ? <Settings /> : <Register />}</Route>
        <Route path="/accessories">{user ? <Settings /> : <Register />}</Route>
        <Route path="/bloodfinding">{user ? <Settings /> : <Register />}</Route>
        <Route path="/entrepreneur">{user ? <Settings /> : <Register />}</Route>
        <Route path="/reports">{user ? <Settings /> : <Register />}</Route> */}
        <Route path="/accommodationPost/:postId">
          <AccSinglePost></AccSinglePost>
        </Route>
        <Route path="/bookPost/:postId">
          <BookSinglePost></BookSinglePost>
        </Route>
        <Route path="/accessoriesPost/:postId">
          <OtherThingsSinglePost/>
        </Route>
        <Route path="/entrepreneurPost/:postId">
          <EntSinglePost></EntSinglePost>
        </Route>
        <Route path="/bloodPost/:postId">
          <BldSinglePost></BldSinglePost>
        </Route>
        <Route path="/reportsPost/:postId">
          <RptSinglePost></RptSinglePost>
        </Route>
        <Route path="/:userId">
          <Profile></Profile>
        </Route>

        <Route path="/accommodationFilter">
          <accFilter></accFilter>
        </Route>

      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
