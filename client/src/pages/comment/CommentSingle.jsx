import React from 'react';
import {axiosInstance} from "../../config";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {Context} from "../../context/Context"

const CommentSingle = ({comment}) => {
  const [auther, setAuther] = useState([]);
  const [commentsNo, setCommentsNo] = useState([]);

  const PF = "https://student-helpline-blog.herokuapp.com/images/";

    const loc = useLocation();
    const path = loc.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);

    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

  //   useEffect(() =>{
  //     const getId = async () => {
  //         const fetchUser = await axiosInstance.get(`users/${comment.userId}`)
  //         console.log(fetchUser.data)
  //         setAuther(fetchUser.data)
  
  //     };
  //     getId();
  // }, [comment])

    useEffect(() => {
        const getPost = async () => {
          const res = await axiosInstance.get(`/comment/${comment._id}` );
          const fetchUser = await axiosInstance.get(`/users/${comment.userId}`)
          setAuther(fetchUser.data)
          setPost(res.data);
          setDesc(res.data.desc);
        };
        getPost();
      }, [comment]);

      const handleDelete = async () => {
        try {
          await axiosInstance.delete(`/comment/${comment._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
      const handleUpdate = async () => {
        try {
          await axiosInstance.put(`/comment/${comment._id}`, {
            username: user.username,
            postID: path, 
            desc, 
          });
          setUpdateMode(false)
        } catch (err) {}
      };


    return (
    <div className="card  mb-3">
    <div className="card-body">

    <Link to={`/${comment.userId}`} className="link">
    <div className="d-flex justify-content-start">
    {/* <div className="col-md-2 " style={{width:"60px"}}> */}
    <div className="settingsPP">
                {auther.profilePic ? ( <img
              src={PF+auther.profilePic}
              alt=""
            />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)}
           
            </div> &nbsp; &nbsp;
    {/* </div> */}
    {/* <div className="col-md-10"   style={{paddingTop:"10px"}} > */}
      <div style={{paddingTop:"10px"}}>
      <h3 className="card-title" style={{fontSize:"16px"}}>{post.username}</h3> 
    <h6 class="card-subtitle text-muted" style={{fontSize:"12px"}}><span>{new Date(post.createdAt).toDateString()}</span></h6>
      </div>
      
    
      {/* </div> */}


  </div>
  </Link>

    {/* <div className="settingsPP">
                      {auther.profilePic ? ( <img
                    src={PF+auther.profilePic}
                    alt=""
                  />) : (<img alt='' src={"http://www.megaweb.co.th/demo/travus/components/com_spbooking/assets/images/default.png"}></img>)}
                 
                  </div>
    <h3 className="card-title">
   <Link to={`/${comment.userId}`} className="link">
     <b> {comment.username}</b>
   </Link>
 </h3>
 <h6 class="card-subtitle mb-2 text-muted">
 <span>
   {new Date(comment.createdAt).toDateString()}
 </span>
 </h6> */}

{updateMode ? (
<h5 className="card-title">edit comment</h5>
) : (
 <h5 className="card-text">
   {desc}
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
 </h5>
)}

 


{updateMode ? (
   <div>
       <textarea
   className="form-control"

   value={desc}
   onChange={(e) => setDesc(e.target.value)}
 />     <br />
   </div> 
) : ("")}
{updateMode && (
  
 <button className="singlePostButton btn btn-primary" onClick={handleUpdate}>
   Update
 </button>
)}
</div>
</div>
      
       
    );
};

export default CommentSingle;