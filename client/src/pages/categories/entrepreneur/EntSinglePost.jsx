import React from 'react';
import axiosInstance from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./entSinglePost.css"

const EntSinglePost = () => {

  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);

    const loc = useLocation();
    const path = loc.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "https://student-helpline-blog.herokuapp.com/images/";
    const { user } = useContext(Context);

    const [locationRange, setLocationRange] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startUpType, setStartUpType] = useState("");
    const [productType, setProductType] = useState("");
    const [contact, setContact] = useState("");
    const [startUpName, setStartUpName] = useState("");
    const [desc, setDesc] = useState("");

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
          const res = await axiosInstance.get("/entrepreneur/" + path);
          const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
          console.log(fetchUser.data)
          setAuther(fetchUser.data)
          setPost(res.data);
          setLocationRange(res.data.locationRange);
          setPrice (res.data.price); 
          setQuantity(res.data.quantity);
          setContact(res.data.contact);
          setStartUpType (res.data.startUpType)
          setProductType (res.data.productType)
          setStartUpName (res.data.startUpName)
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
          await axiosInstance.delete(`/entrepreneur/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
      const handleUpdate = async () => {
        try {
          await axiosInstance.put(`/accommodations/${post._id}`, {
            username: user.username,
            locationRange,
            desc, price, quantity, contact, startUpName, startUpType, productType
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
      <h3 className="card-title"> Product Type:: </h3>
      <input
      type="text"
      value={productType}
      className="form-control"
      autoFocus
      onChange={(e) => setProductType(e.target.value)}
    />
    </div>
   
  ) : (
    <h3 className="card-title">
      Product Type: {productType}
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


<input
              type="text"
              placeholder="StartUp Name"
              className="form-control"
              autoFocus={true}
              onChange={e=>setStartUpName(e.target.value)}
            />
          
          
          <input
              placeholder="Tell startup Type"
              type="text"
              className="form-control"
              onChange={e=>setStartUpType(e.target.value)}
            ></input> <br /> 
            
            <input
              placeholder="Tell price"
              type="text"
              className="form-control"
              onChange={e=>setPrice(e.target.value)}
            ></input> <br />

            <input
              placeholder="Tell quantity"
              type="text"
              className="form-control"
              onChange={e=>setQuantity(e.target.value)} 
            ></input> <br />

          <textarea
              placeholder="Tell location Range"
              type="text"
              className="form-control"
              onChange={e=>setLocationRange(e.target.value)} 
            ></textarea>  <br />


      
    <input
    placeholder="Tell contact"
    type="text"
    onChange={e=>setContact(e.target.value)}
    className="form-control"
  ></input> <br />

<textarea
    placeholder="Tell description"
    type="text"
    onChange={e=>setDesc(e.target.value)}
    className="form-control"
  ></textarea> <br />
      </div>
    
    
  ) : (
      <div>
        
          <p className="card-text">StartUp Type: {startUpType}</p>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Quantity: {quantity}</p>  
          <p className="card-text">Location Range: {locationRange}</p>
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


{post.photo ? <img  className="card-img-top" style={{height:"250px"}} src={PF + post.photo}  alt="" /> : <img  className="card-img-top" style={{height:"250px"}} src="https://image.shutterstock.com/image-vector/grunge-rubber-stamp-text-look-260nw-197453309.jpg" alt="" /> }
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

















        {/* <div style={{border: '1px solid red', height: '650px', width: '400px'}}>
        <div className="singlePostWrapper">
        {post.photo ? 
        (<img src={PF + post.photo} style={{height: '200px', width: '200px'}} alt="" className="singlePostImg" /> ):
          <img src="https://image.shutterstock.com/image-vector/grunge-rubber-stamp-text-look-260nw-197453309.jpg" style={{height: '200px', width: '200px'}} alt="" /> }
   {updateMode ? (
     <div>
       <h1>StartUp Name: </h1>
       <input
       type="text"
       value={startUpName}
       className="singlePostTitleInput"
       autoFocus
       onChange={(e) => setStartUpName(e.target.value)}
     />
     </div>
   ) : (
     <h1 className="singlePostTitle">
       StartUp Name: {startUpName}
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

<h6>StartUp Type: </h6>  <textarea
       className="singlePostDescInput"
       value={startUpType}
       onChange={(e) => setStartUpType(e.target.value)}
     /> <br />

        <h6>Product Type: </h6> <textarea
       className="singlePostDescInput"
       value={productType}
       onChange={(e) => setProductType(e.target.value)}
     /> <br />

         <h6>Price: </h6>  <textarea
       className="singlePostDescInput"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
     /> <br />

         <h6>Quantity: </h6>  <textarea
       className="singlePostDescInput"
       value={quantity}
       onChange={(e) => setQuantity(e.target.value)}
     /> <br />

<h6>Location Range: </h6>   <textarea
       className="singlePostDescInput"
       value={locationRange}
       onChange={(e) => setLocationRange(e.target.value)}
     /> <br />

<h6>Description: </h6> <textarea
       className="singlePostDescInput"
       value={desc}
       onChange={(e) => setDesc(e.target.value)}
     /> <br />

        <h6>Contact: </h6>   <textarea
       className="singlePostDescInput"
       value={contact}
       onChange={(e) => setContact(e.target.value)}
     /> <br />
       </div>
     
     
   ) : (
       <div>
          <p>StartUp Type: {startUpType}</p>
          <p>Product Type: {productType}</p> 
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>  
          <p>Location Range: {locationRange}</p>
          <p className="singlePostDesc">Description: {desc}</p>
          <p>Contact: 0{contact}</p>
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

export default EntSinglePost;