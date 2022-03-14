import React from 'react';
import axiosInstance from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./rptSinglePost.css"

const RptSinglePost = () => {
  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);

    const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://student-helpline-blog.herokuapp.com/images/";
  const { user } = useContext(Context);

  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState(""); 

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/reports/" + path);
      const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
      console.log(fetchUser.data)
      setAuther(fetchUser.data)
      setPost(res.data);
      setTitle(res.data.title);
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
      await axiosInstance.delete(`/reports/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/reports/${post._id}`, {
        username: user.username,
        title,
        desc
      });
      setUpdateMode(false)
    } catch (err) {}
  };
    return (

<>

<div className="container" style={{height:"1200px", backgroundColor:"#f4f4f4"}}>
  
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
            <h3 className="card-title">Title: </h3>
            <input
            type="text"
            value={title}
            className="form-control"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          </div>
         
        ) : (
          <h3 className="card-title">
            Title: {title}
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

            <h6 className="card-text">Description: </h6> <textarea
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          /> <br />

             
            </div>
          
          
        ) : (
            <div>
              
        
               <p className="card-text"> Descriptions: {desc}</p>
           
               
            </div>
          
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
  

      {post.photo ? <img  className="card-img-top" style={{height:"250px"}} src={PF + post.photo}  alt="" /> : <img  className="card-img-top" style={{height:"250px"}} src="https://www.via-ks.com/wp-content/uploads/2017/01/news-images-3.jpg" alt="" /> }
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

   </>
    );
};

export default RptSinglePost;