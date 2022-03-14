import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';
import "./entWrite.css"

const EntWrite = () => {
    const [locationRange, setLocationRange] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startUpType, setStartUpType] = useState("");
    const [productType, setProductType] = useState("");
    const [contact, setContact] = useState("");
    const [startUpName, setStartUpName] = useState("");
    const [desc, setDesc] = useState("");

    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          userId:user._id,
          locationRange,
         desc, price, quantity, contact, startUpName, startUpType, productType
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
          await axiosInstance.post("/entrepreneur", newPost);
          window.location.reload();
        } catch (err) {}
      };

    return (

      <>


<div className="write">

<div className="write-body">
<span className="write-title">Create a post</span> <br />
<form onSubmit={handleSubmit}>


          <input
              type="text"
              placeholder="StartUp Name"
              className="form-control"
              autoFocus={true}
              onChange={e=>setStartUpName(e.target.value)}
            /> <br />
          
          
          <input
              placeholder="Tell startup Type"
              type="text"
              className="form-control"
              onChange={e=>setStartUpType(e.target.value)}
            ></input> <br /> 

            <input
              placeholder="Tell Product Type"
              type="text"
              className="form-control"
              onChange={e=>setProductType(e.target.value)}
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
    placeholder="Tell description"
    type="text"
    onChange={e=>setDesc(e.target.value)}
    className="form-control"
  ></textarea> <br />


<button  className="btn btn-primary" type="submit">
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
              placeholder="StartUp Name"
              className="writeInput"
              autoFocus={true}
              onChange={e=>setStartUpName(e.target.value)}
            />
          </div>
          
          <input
              placeholder="Tell startup Type"
              type="text"
              onChange={e=>setStartUpType(e.target.value)}
            ></input>
            <input
              placeholder="Tell Product Type"
              type="text"
              
              onChange={e=>setProductType(e.target.value)}
            ></input>
            
            <input
              placeholder="Tell price"
              type="text"
              
              onChange={e=>setPrice(e.target.value)}
            ></input> <br />
            <input
              placeholder="Tell quantity"
              type="text"
            
              onChange={e=>setQuantity(e.target.value)} 
            ></input> <br />
          <textarea
              placeholder="Tell location Range"
              type="text"
              
              onChange={e=>setLocationRange(e.target.value)} 
            ></textarea>  <br />
            <textarea
              placeholder="Tell description"
              type="text"
              
              onChange={e=>setDesc(e.target.value)}
            ></textarea> <br />
            <input
              placeholder="Tell contact"
              type="text"
              
              onChange={e=>setContact(e.target.value)}
            ></input> <br />
         
          <button  type="submit">
            Publish
          </button>
        </form>
      </div> */}

      </>
    );
};

export default EntWrite;