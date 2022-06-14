import React from 'react';
import axiosInstance from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./bldSinglePost.css"

const BldSinglePost = () => {

    const [auther, setAuther] = useState([]);
    const [commentsNo, setCommentsNo] = useState([]);

    const loc = useLocation()
    const path = loc.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "https://student-helpline-blog.herokuapp.com/images/";
    const { user } = useContext(Context);

    
    const [location, setLocation] = useState("");
    const [group, setGroup] = useState("");
    const [bags, setBags] = useState(""); 
    const [time, setTime] = useState("");
    const [contact, setContact] = useState("");
    const [patientState, setPatientState] = useState("");
    const [desc, setDesc] = useState("");
    
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
          const res = await axiosInstance.get("/blood/" + path);
          const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
          console.log(fetchUser.data)
          setAuther(fetchUser.data)
          setPost(res.data);
          setLocation(res.data.location);
          setGroup (res.data.group);
          setTime(res.data.time)
          setContact(res.data.contact);
          setBags (res.data.bags)
          setPatientState(res.data.patientState)
          setDesc(res.data.desc);
        };
        getPost();
      }, [path]);

      useEffect(() =>{
        const fetchCommentsNo = async () => {
            const res = await axiosInstance.get(`/comment/${post._id}/count`);
            setCommentsNo(res.data)
        };
        fetchCommentsNo();
      },[post._id])
    
      const handleDelete = async () => {
        try {
          await axiosInstance.delete(`/blood/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
      const handleUpdate = async () => {
        try {
          await axiosInstance.put(`/blood/${post._id}`, {
            username: user.username,
            location,
            desc, time, bags, contact, group, patientState
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    return (
        <div className="container" style={{ backgroundColor:"#f4f4f4"}} >
             <div className="row">

               <div className="col-md-8" style={{marginTop:"100px"}}>

              <div className="card mb-3">

                <div className="card-body">

                <Link to={`/${post.userId}`} className="link">
               <div className="row">
               
    <div className="col-md-3 " style={{width:"70px"}}>
    <div className="settingsPP">
                {auther.profilePic ? ( <img
              src={PF+auther.profilePic}
              alt=""
            />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)}
           
            </div>
    </div>
    <div className="col-md-9"   style={{paddingTop:"10px"}} >
      <div>
      <h3 className="card-title" style={{fontSize:"16px"}}>{post.username}</h3> 
    <h6 class="card-subtitle text-muted" style={{fontSize:"12px"}}><span>{new Date(post.createdAt).toDateString()}</span></h6>
      </div>
      
    
      </div>
     


  </div>
  </Link>
            
        {updateMode ? (
          <div>
            <h3 className="card-title">Group: </h3>
          <input
            type="text"
            value={group}
            className="form-control"
            autoFocus
            onChange={(e) => setLocation(e.target.value)}
          />
          </div>
        ) : (
          <h3 className="card-title">
            Group: {group}
            {post.username === user?.username && (
              <div >
                <i
                  className="far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h3>
        )}
        
        {updateMode ? (
            <div> 
              
              <h6 className="card-text">Location: </h6> <textarea
           className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /> <br />

            <h6 className="card-text">Date and Time: </h6> <textarea
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          /> <br />

          <h6 className="card-text">Bags: </h6>  <textarea
            className="form-control"
            value={bags}
            onChange={(e) => setBags(e.target.value)}
          /> <br />
              
              
              <h6 className="card-text">Patient State: </h6>  <textarea
            className="form-control"
            value={patientState}
            onChange={(e) => setPatientState(e.target.value)}
          /> <br />

            <h6 className="card-text">Descriptions</h6>
                <textarea
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          /> <br />

                

             <h6 className="card-text">Contact: </h6>  <textarea
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
            </div>
          
          
        ) : (
            <div>
               
               <p className="card-text"> Location: {location}</p>
               <p className="card-text"> Date and Time: {time}</p>
               <p className="card-text"> Bags: {bags}</p>
               <p className="card-text"> Patient State: {patientState}</p>
               <p className="card-text"> Descriptions: {desc}</p>
               <p className="card-text"> Contact: {contact}</p>
               
            </div>
          
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
</div>

{post.photo ? 
        (<img src={PF + post.photo} style={{height:"250px"}} alt="" className="card-img-top" /> ):
          <img className="card-img-top" style={{height:"250px"}} src="https://previews.123rf.com/images/laracold/laracold1706/laracold170600015/80321483-creative-blood-motivation-information-donor-poster-blood-donation-world-blood-donor-day-banner-red-b.jpg"  alt="" /> }
          <div className="d-flex justify-content-between px-3" >
    
    <p ><i class="fa-solid fa-comment"></i> &nbsp; Comments</p>  
      
    
    <span>{commentsNo} comments </span>
     
  </div>

</div>
</div>

        <div className="col-md-4">
              <CommentBlock></CommentBlock> 
        </div>

      </div>
        </div>
    );
};

export default BldSinglePost;