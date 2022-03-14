import React from 'react';
import { useContext, useEffect, useState } from "react";
import {axiosInstance} from "../../../config";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"

const AccPost = ({ post }) => {
    const [auther, setAuther] = useState([]);
    const [commentsNo, setCommentsNo] = useState([]);
    const PF = "https://student-helpline-blog.herokuapp.com/images/";
    const { user } = useContext(Context);

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
     

<Link to={`/accommodationPost/${post._id}`} className="link">
<div className="card mb-3 h-80 "  style={{borderRadius:"10px"}}  >
  
  
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
  
  
  
    <h5 className="card-title" >Location: {post.location}</h5>
    <p className="card-text" >Rent: {post.rent}</p>
    <p className="card-text" >Descriptions: {post.desc}</p>
    
          
        
  </div>
  {post.photo ? <img  className="card-img-top" style={{height:"250px"}} src={PF + post.photo}  alt="" /> : <img style={{height:"250px"}} className="card-img-top" src="https://www.wantedinrome.com/i/preview/storage/uploads/2017/05/Acc-Vacant-in_light.jpg" alt="" /> }

  <div className="d-flex justify-content-between px-3" >
    
    <p ><i class="fa-solid fa-comment"></i> &nbsp; Comments</p>  
      
    
    <span>{commentsNo} comments </span>
     
  </div>
  
  
</div>
</Link>

        
        
    );
};

export default AccPost;
