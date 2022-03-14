import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';
import "./rptWrite.css"

const RptWrite = () => {
    const [desc, setDesc] = useState("");
  const [title, setTitle] = useState(""); 

  const [file, setFile] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userId:user._id,
      title,
      desc
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axiosInstance.post("/reports", newPost);
      window.location.reload();
    } catch (err) {}
  };


    return (
      <>


<div className="write">

        <div className="write-body">
        <span className="write-title">Create a post</span> <br />
        <form onSubmit={handleSubmit}>

    
          <textarea
            placeholder="Write Title"
            type="text"
            onChange={e=>setTitle(e.target.value)}
            className="form-control"
          ></textarea>  <br />

      

      {file && (
        <img className="writeImg" style={{height: '100px', width: '100px', marginTop: '25px'}} src={URL.createObjectURL(file)} alt="" />
      )}
     
        
          
          <label className="btn btn-primary" htmlFor="fileInput">
            Add Photo
          </label> <br />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          /> <br />
        
         
        
          <textarea
            placeholder="Write description"
            type="text"
            onChange={e=>setDesc(e.target.value)}
            className="form-control"
          ></textarea> <br />


        <button className="btn btn-primary" type="submit">
          Publish
        </button>
      </form>
      </div>
    </div>












        {/* <div className="write container"> 
      {file && (
        <img className="writeImg" style={{height: '200px', width: '200px'}} src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
          <textarea
            placeholder="Tell description"
            type="text"
            onChange={e=>setDesc(e.target.value)}
          ></textarea> <br />
       

        <button  type="submit">
          Publish
        </button>
      </form>
    </div> */}

    </>
    );
};

export default RptWrite;