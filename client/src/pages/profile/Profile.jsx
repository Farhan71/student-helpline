import React from 'react';
import {axiosInstance} from "../../config";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const Profile = () => {
    const loc = useLocation();
    const [user, setUser] = useState([]);
    const userId = loc.pathname.split("/")[1];
    const PF ="https://student-helpline-blog.herokuapp.com/images/";
    console.log(userId);
    useEffect(() =>{
        const getId = async () => {
            const fetchUser = await axiosInstance.get(`users/${userId}`)
            console.log(fetchUser.data)
            setUser(fetchUser.data)
            // setId(res.data)
        };
        getId();
    }, [userId])
    
    // console.log(id[1]);
    return (
        <div className="d-flex align-items-center justify-content-center p-5" style={{backgroundColor:"#f4f4f4", padding:"0px"}}>

            <div className="card">

            <div className="card-body">
            <h6 className="d-flex align-items-center justify-content-center"> <div className="settingsPP">
                {user.profilePic ? ( <img
              src={PF+user.profilePic}
              alt=""
            />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)} 
           
            </div>
            </h6>
            <h3 className="card-title text-center">Username: {user.username}</h3> <br /> <br />
            <h5 className="card-text">Email: {user.email}</h5>
            <h5 className="card-text">Contact Number: {user.contact}</h5>
            <h5 className="card-text">Student ID: {user.studentId}</h5>
            <h5 className="card-text">Blood Group: {user.bloodGroup}</h5>

            </div>

            </div>


        </div>
    );
};

export default Profile;