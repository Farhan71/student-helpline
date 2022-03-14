import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../config";
import {Context } from "../../context/Context";

const CommentWrite = ({postID}) => {
    const [desc, setDesc] = useState("");
    const { user } = useContext(Context);
    console.log(postID)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          userId:user._id,
          desc, postID: postID,  
        };
        try {
          await axiosInstance.post("/comment", newPost);
          window.location.reload();
        } catch (err) {}
      };
    return (
        // <div>
        //     <label htmlFor="">Write Comment</label>
        //     <input type="text" />
        //     <input type="submit" value="Submit" />
        // </div>

        <div className="container">
      <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write Comment"
            type="text"
            onChange={e=>setDesc(e.target.value)}
            className="form-control"
          ></textarea> <br />

        <button className="btn btn-primary"  type="submit">
          Publish
        </button> <br />
      </form>
    </div>



    );
};

export default CommentWrite;