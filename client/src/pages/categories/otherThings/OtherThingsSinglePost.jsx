import React from 'react';
import {axiosInstance} from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./otherThingsSinglePost.css";

const OtherThingsSinglePost = () => {
    const [auther, setAuther] = useState([]);
    const [commentsNo, setCommentsNo] = useState([]);

    const loc = useLocation();
    const path = loc.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "https://student-helpline-blog.herokuapp.com/images/";
    const { user } = useContext(Context);
  
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [contact, setContact] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
  
    useEffect(() => {
      const getPost = async () => {
        const res = await axiosInstance.get("/otherThings/" + path);
        const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
        console.log(fetchUser.data)
        setAuther(fetchUser.data)
        setPost(res.data);
        setType(res.data.type);
        setQuantity (res.data.quantity);
        setPrice(res.data.price)
        setContact(res.data.contact);
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
        await axiosInstance.delete(`/otherThings/${post._id}`, {
          data: { username: user.username },
        });
        window.location.replace("/");
      } catch (err) {}
    };
  
    const handleUpdate = async () => {
      try {
        await axiosInstance.put(`/otherThings/${post._id}`, {
          username: user.username,
          type,
          desc, quantity, price, contact
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
      
        {updateMode ? (

          <div>
            <h3 className="card-title">Type: </h3>
            <input
            type="text"
            value={type}
            className="form-control"
            autoFocus
            onChange={(e) => setType(e.target.value)}
          />
          </div>
         
        ) : (
          <h3 className="card-title">
            Type: {type}
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


             <h6 className="card-text">Quantity: </h6>  
            <textarea
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          /> <br />

             <h6 className="card-text">Price: </h6>   <textarea
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
              
                <p className="card-text"> Quantity: {quantity}</p>
                <p className="card-text"> Price: {price}</p>
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
  

      {post.photo ? <img  className="card-img-top" style={{height:"250px"}} src={PF + post.photo}  alt="" /> : <img className="card-img-top" style={{height:"250px"}} src="https://us.123rf.com/450wm/roxanabalint/roxanabalint1712/roxanabalint171200111/91315171-for-sale-grunge-rubber-stamp-on-white-background-vector-illustration.jpg?ver=6" alt="" /> }
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



















        {/* <div style={{border: '1px solid red', height: '500px', width: '400px'}}>
        <div className="singlePostWrapper">
        {post.photo ? 
        (<img src={PF + post.photo} style={{height: '200px', width: '200px'}} alt="" className="singlePostImg" /> ):
          <img src="https://us.123rf.com/450wm/roxanabalint/roxanabalint1712/roxanabalint171200111/91315171-for-sale-grunge-rubber-stamp-on-white-background-vector-illustration.jpg?ver=6" style={{height: '200px', width: '200px'}} alt="" /> }
   {updateMode ? (
    <div>
      <h1>Type: </h1>
       <input
       type="text"
       value={type}
       className="singlePostTitleInput"
       autoFocus
       onChange={(e) => setType(e.target.value)}
     />
    </div>
   ) : (
     <h1 className="singlePostTitle">
       Type: {type}
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
     </h1>
   )}
   <div className="singlePostInfo">
     <span className="singlePostAuthor">
       Posted By:
       <Link to={`/${post.username}`} className="link">
         <b> {post.username}</b>
       </Link>
     </span>
     <p> At: 
     <span className="singlePostDate">
       {new Date(post.createdAt).toDateString()}
     </span>
     </p>
     
   </div>
   {updateMode ? (
       <div>


         <h6>Quantity: </h6>  <textarea
       className="singlePostDescInput"
       value={quantity}
       onChange={(e) => setQuantity(e.target.value)}
     /> <br />

         <h6>Price: </h6>  <textarea
       className="singlePostDescInput"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
     /> <br />

      <h6>Description: </h6>  <textarea
       className="singlePostDescInput"
       value={desc}
       onChange={(e) => setDesc(e.target.value)}
     /> <br />

         <h6>Contact: </h6>  <textarea
       className="singlePostDescInput"
       value={contact}
       onChange={(e) => setContact(e.target.value)}
     /> <br />
       </div>
     
     
   ) : (
       <div>
          <p>Quantity:{quantity}</p>
          <p>Price: {price}</p>
          <p className="singlePostDesc">Description:{desc}</p>
          <p>Contact: {contact}</p>
          <CommentBlock></CommentBlock>
       </div>
     
   )}
   {updateMode && (
     <button className="singlePostButton" onClick={handleUpdate}>
       Update
     </button>
   )}
 </div>
   </div> */}

   </>
    );
};

export default OtherThingsSinglePost;