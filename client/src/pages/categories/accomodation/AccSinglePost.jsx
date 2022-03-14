import React from 'react';
import {axiosInstance} from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./accSinglePost.css"

const AccSinglePost = () => {
  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);


  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF ="https://student-helpline-blog.herokuapp.com/images/";
  const { user } = useContext(Context);

  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [member, setMember] = useState("");
  const [contact, setContact] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [desc, setDesc] = useState("");
  
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/accommodations/" + path);
      const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
      console.log(fetchUser.data)
      setAuther(fetchUser.data)
      setPost(res.data);
      setLocation(res.data.location);
      setRent (res.data.rent);
      setMember(res.data.member)
      setContact(res.data.contact);
      setLocationDetails (res.data.locationDetails)
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
      await axiosInstance.delete(`/accommodations/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/accommodations/${post._id}`, {
        username: user.username,
        userId: user._id,
        location,
        desc, rent, member, contact, locationDetails
      });
      setUpdateMode(false)
    } catch (err) {}
  };

    return (
<div className="container" style={{height:"1000px", backgroundColor:"#f4f4f4"}}>
  
        <div className="row" >
          <div className="col-md-8" style={{marginTop:"100px"}} >
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
               {/* <div className="settingsPP">
                      {auther.profilePic ? ( <img
                    src={PF+auther.profilePic}
                    alt=""
                  />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)}
                 
                  </div>
        
        <h3 className="card-title"> <Link to={`/${post.userId}`} className="link">{post.username} </Link> </h3>
        <h6 class="card-subtitle mb-2 text-muted"><span>{new Date(post.createdAt).toDateString()}</span></h6> */}
      
        {updateMode ? (

          <div>
            <h3 className="card-title">Location: </h3>
            <input
            type="text"
            value={location}
            className="form-control"
            autoFocus
            onChange={(e) => setLocation(e.target.value)}
          />
          </div>
         
        ) : (
          <h3 className="card-title">
            Location: {location}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h3>
        )}
      
        {updateMode ? (
            <div>


             <h6 className="card-text">Location Details: </h6>  
            <textarea
            className="form-control"
            value={locationDetails}
            onChange={(e) => setLocationDetails(e.target.value)}
          /> <br />

             <h6 className="card-text">Rent: </h6>   <textarea
            className="form-control"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          /> <br />

             <h6 className="card-text">Member: </h6>   <textarea
            className="form-control"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          /> <br />

            <h6 className="card-text">Description: </h6> <textarea
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          /> <br />

             <h6 className="card-text">Contact: </h6>   <textarea
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          /> <br />
            </div>
          
          
        ) : (
            <div>
              
                <p className="card-text" >Location Details: {locationDetails}</p>
                <p className="card-text"> Rent: {rent}</p>
                <p className="card-text"> Member: {member}</p>
               <p className="card-text"> Descriptions: {desc}</p>
                <p className="card-text">Contact: 0{contact}</p>
               
            </div>
          
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
  

      {post.photo ? <img style={{height:"250px"}}  className="card-img-top" src={PF + post.photo}  alt="" /> : <img style={{height:"250px"}} className="card-img-top" src="https://www.wantedinrome.com/i/preview/storage/uploads/2017/05/Acc-Vacant-in_light.jpg" alt="" /> }
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

export default AccSinglePost;