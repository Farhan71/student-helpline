import React from 'react';
import axiosInstance from "../../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../../context/Context"
import CommentBlock from '../../comment/CommentBlock';
import "./bookSinglePost.css"

const BookSinglePost = () => {

  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);


    const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://student-helpline-blog.herokuapp.com/images/";
  const { user } = useContext(Context);

    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [department, setDepartment] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [desc, setDesc] = useState("");

  const [updateMode, setUpdateMode] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/books/" + path);
      const fetchUser = await axiosInstance.get(`/users/${res.data.userId}`)
      console.log(fetchUser.data)
      setAuther(fetchUser.data)
      setPost(res.data);
      setBookName(res.data.bookName);
      setBookAuthor (res.data.bookAuthor);
      setQuantity(res.data.quantity)
      setContact(res.data.contact);
      setDepartment (res.data.department);
      setPrice (res.data.price);
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
      await axiosInstance.delete(`/books/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/books/${post._id}`, {
        username: user.username,
        bookName, bookAuthor, department, price, quantity,
        desc,  contact
      });
      setUpdateMode(false)
    } catch (err) {}
  };
    return ( 

     

<div className="container" style={{ backgroundColor:"#f4f4f4"}}>
  
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
      <h3 className="card-title">Book Name: </h3>
      <input
      type="text"
      value={bookName}
      className="form-control"
      autoFocus
      onChange={(e) => setBookName(e.target.value)}
    />
    </div>
   
  ) : (
    <h3 className="card-title">
      Book Name: {bookName}
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


       <h6 className="card-text">Book Auther: </h6>  
      <textarea
      className="form-control"
      value={bookAuthor}
      onChange={(e) => setBookAuthor(e.target.value)}
    /> <br />

       <h6 className="card-text">Department: </h6>   <textarea
      className="form-control"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
    /> <br />

       <h6 className="card-text">Quantity: </h6>   <textarea
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
        
          <p className="card-text">Book Auther: {bookAuthor}</p>
          <p className="card-text"> Department: {department}</p>
          <p className="card-text"> Quantity: {quantity}</p>
          <p className="card-text"> price: {price}</p>
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


{post.photo ? <img  className="card-img-top" style={{height:"250px"}} src={PF + post.photo}  alt="" /> : <img style={{height:"250px"}}  className="card-img-top" src="https://demo.themesgrove.com/themes/exploore/wp-content/uploads/2019/06/image-6.jpg" alt="" /> }
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























//         <div style={{border: '1px solid red', height: '600px', width: '400px'}}>
//              <div className="singlePostWrapper">
//              {post.photo ? 
//         (<img src={PF + post.photo} style={{height: '200px', width: '200px'}} alt="" className="singlePostImg" /> ):
//           <img src="https://www.wantedinrome.com/i/preview/storage/uploads/2017/05/Acc-Vacant-in_light.jpg" style={{height: '200px', width: '200px'}} alt="" /> }
//         {updateMode ? (
//           <div>
//             <h1>Book Name: </h1>
//             <input
//             type="text"
//             value={bookName}
//             className="singlePostTitleInput"
//             autoFocus
//             onChange={(e) => setBookName(e.target.value)}
//           />
//           </div>
//         ) : (
//           <h1 className="singlePostTitle">
//             Book Name : {bookName}
//             {post.username === user?.username && (
//               <div className="singlePostEdit">
//                 <i
//                   className="singlePostIcon far fa-edit"
//                   onClick={() => setUpdateMode(true)}
//                 ></i>
//                 <i
//                   className="singlePostIcon far fa-trash-alt"
//                   onClick={handleDelete}
//                 ></i>
//               </div>
//             )}
//           </h1>
//         )}
//         <div className="singlePostInfo">
//           <span className="singlePostAuthor">
//             Posted By:
//             <Link to={`/${post.username}`} className="link">
//               <b> {post.username}</b>
//             </Link>
//           </span>
//           <p> At:
//           <span className="singlePostDate">
//             {new Date(post.createdAt).toDateString()}
//           </span>
//           </p>
//         </div>
//         {updateMode ? (
//             <div>
              

//               <h6>Book Author: </h6>  
              
//             <textarea
//             className="singlePostDescInput"
//             value={bookAuthor}
//             onChange={(e) => setBookAuthor(e.target.value)}
            
//           /> <br />

// <h6>Department: </h6>  <textarea
//             className="singlePostDescInput"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//           /> <br />

//               <h6>Quantity: </h6>  <textarea
//             className="singlePostDescInput"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           /> <br />

//               <h6>Price: </h6>  <textarea
//             className="singlePostDescInput"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           /> <br />


//           <h6>Description: </h6>  <textarea
//             className="singlePostDescInput"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           /> <br />
              

//               <h6>Contact: </h6>  <textarea
//             className="singlePostDescInput"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//           /> <br />
//             </div>
          
          
//         ) : (
//             <div>
               
//                <p>Book Author: {bookAuthor}</p>
//                <p>Department: {department}</p>
//                <p>Quantity: {quantity}</p>
//                <p>Price: {price}</p>
//                <p className="singlePostDesc">Description: {desc}</p>
//                <p>Contact: 0{contact}</p>
               
//                <CommentBlock></CommentBlock>
//             </div>
          
//         )}
//         {updateMode && (
//           <button className="singlePostButton" onClick={handleUpdate}>
//             Update
//           </button>
//         )}
//       </div>
//         </div>


        
    );
};

export default BookSinglePost;