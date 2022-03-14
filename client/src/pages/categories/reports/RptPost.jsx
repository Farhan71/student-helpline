import React from 'react';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./rptPost.css"
import axiosInstance from "../../../config";

const RptPost = ({ post }) => {
  const [auther, setAuther] = useState([]);
    const [commentsNo, setCommentsNo] = useState([]);
    const PF ="https://student-helpline-blog.herokuapp.com/images/";

    useEffect(() =>{
      const getId = async () => {
          const fetchUser = await axiosInstance.get(`users/${post.userId}`)
          console.log(fetchUser.data)
          setAuther(fetchUser.data)
      };
      getId();
  }, [post.userId])

  useEffect(() =>{
    const fetchCommentsNo = async () => {
        const res = await axiosInstance.get(`/comment/${post._id}/count`);
        setCommentsNo(res.data)
    };
    fetchCommentsNo();
},[post._id])


    return (
       
 

<Link to={`/reportsPost/${post._id}`} className="link">
<div className="card mb-3 h-80"  style={{borderRadius:"10px"}} >
  
  
  <div className="card-body"> 

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
  {/* <div className="settingsPP">
                {auther.profilePic ? ( <img
              src={PF+auther.profilePic}
              alt=""
            />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)}
           
            </div>
  
  <h3 className="card-title">{post.username}</h3>
    <h6 class="card-subtitle mb-2 text-muted"><span>{new Date(post.createdAt).toDateString()}</span></h6> */}
    <h5 className="card-title">Title: {post.title}</h5>
    <p className="card-text">Descriptions: {post.desc}</p>
    
          
        
  </div>
  {post.photo ? <img  style={{height:"250px"}} className="card-img-top" src={PF + post.photo}  alt="" /> : <img className="card-img-top" style={{height:"250px"}} src="https://www.via-ks.com/wp-content/uploads/2017/01/news-images-3.jpg" alt="" /> }
  <div className="d-flex justify-content-between px-3" >
    
    <p ><i class="fa-solid fa-comment"></i> &nbsp; Comments</p>  
      
    
    <span>{commentsNo} comments </span>
     
  </div>
</div>
</Link>      
       








       
       
    );
};

export default RptPost;