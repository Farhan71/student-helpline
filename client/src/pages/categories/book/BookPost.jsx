import React from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../config";
import "./bookPost.css"
import {Context} from "../../../context/Context"

const BookPost = ({post}) => {

  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);


    const PF = "https://student-helpline-blog.herokuapp.com/images/";

    useEffect(() =>{
      const getId = async () => {
          const fetchUser = await axiosInstance.get(`users/${post.userId}`)
          console.log(fetchUser.data)
          setAuther(fetchUser.data)
          // setId(res.data)
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
      




<Link to={`/bookPost/${post._id}`} className="link">
<div className="card mb-3 h-80 "  style={{borderRadius:"10px"}}   >
  
  
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
    <h5 className="card-title">Book Name: {post.bookName}</h5>
    <p className="card-text">Department: {post.department}</p>
    <p className="card-text">Descriptions: {post.desc}</p>
    
          
        
  </div>
  {post.photo ? <img style={{height:"250px"}} className="card-img-top" src={PF + post.photo}  alt="" /> : <img style={{height:"250px"}} src="https://demo.themesgrove.com/themes/exploore/wp-content/uploads/2019/06/image-6.jpg" className="card-img-top" alt="" /> }
  <div className="d-flex justify-content-between px-3" >
    
    <p ><i class="fa-solid fa-comment"></i> &nbsp; Comments</p>  
      
    
    <span>{commentsNo} comments </span>
     
  </div>
</div>
</Link> 
        






      //   <div style={{border: '1px solid red', height: '550px', width: '400px'}}>
      //        {post.photo ? <img style={{height: '200px', width: '200px'}} className="postImg" src={PF + post.photo} alt="" /> : <img src="https://www.wantedinrome.com/i/preview/storage/uploads/2017/05/Acc-Vacant-in_light.jpg" style={{height: '200px', width: '200px'}} alt="" />}
      // <div className="postInfo">
        
      //   <Link to={`/bookPost/${post._id}`} className="link">
      //     <span className="postTitle">Book Name: {post.bookName}</span>
      //   </Link>
      //   <hr />
      //   <span className="postDate">
      //     {new Date(post.createdAt).toDateString()}
      //   </span>
      // </div>
      // <p className="postDesc">Book Author: {post.bookAuthor}</p>
      // <p className="postDesc">Department: {post.department}</p>
      // <p className="postDesc">Quantity: {post.quantity}</p>
      // <p className="postDesc">Price: {post.price}</p>
      // <p className="postDesc">Description: {post.desc}</p>
      // <p className="postDesc">Contact: 0{post.contact}</p>
      
      
      //   </div>
      //   <br /> 


        
        
    );
};

export default BookPost;