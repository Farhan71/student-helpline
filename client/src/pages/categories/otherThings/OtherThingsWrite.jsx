import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';
import "./otherThingsWrite.css";


const OtherThingsWrite = () => {
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [contact, setContact] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          userId:user._id,
          type,
          desc, quantity, price, contact
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
          await axiosInstance.post("/otherThings", newPost);
          window.location.reload();
        } catch (err) {}
      };
    return (

      <>
       <div className="write">

<div className="write-body">
<span className="write-title">Create a post</span> <br />
<form onSubmit={handleSubmit}>

<label for="Type">Choose a type:</label>
                    <select onChange={(e) =>  {
                      
                      setType(e.target.value)    

                    }
                    
                    } name="Type" id="Type">
                      <option value="Table">Table</option>
                      <option value="Chair">Chair</option>
                      <option value="Stove"> Stove</option>
                      <option value="Ceiling Fan">Ceiling Fan</option>
                      <option value="Table Fan">Table Fan</option>
                      <option value="Rack"> Rack</option>
                      <option value="Book Shelf"> Book Shelf</option>
                      <option value="tShirt"> tShirt</option>
                      <option value="Hoodie">Hoodie</option>
                      <option value="Jersey"> Jersey</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Laptop">Laptop</option>
                    </select>  <br /> <br />


        <input
              placeholder="Tell quantity"
              type="text"
              onChange={e=>setQuantity(e.target.value)}
              className="form-control"
            ></input> <br />

<input
              placeholder="Tell price"
              type="text"
              className="form-control"
              onChange={e=>setPrice(e.target.value)}
            ></input> <br />



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
            
          </div>
        

          <label for="Type">Choose a type:</label>
                    <select onChange={(e) =>  {
                      
                      setType(e.target.value)    

                    }
                    
                    } name="Type" id="Type">
                      <option value="Table">Table</option>
                      <option value="Chair">Chair</option>
                      <option value="Stove"> Stove</option>
                      <option value="Ceiling Fan">Ceiling Fan</option>
                      <option value="Table Fan">Table Fan</option>
                      <option value="Rack"> Rack</option>
                      <option value="Book Shelf"> Book Shelf</option>
                      <option value="tShirt"> tShirt</option>
                      <option value="Hoodie">Hoodie</option>
                      <option value="Jersey"> Jersey</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Laptop">Laptop</option>
                    </select> 

          <input
              placeholder="Tell quantity"
              type="text"
              onChange={e=>setQuantity(e.target.value)}
            ></input>


            <input
              placeholder="Tell price"
              type="text"
              
              onChange={e=>setPrice(e.target.value)}
            ></input>

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

export default OtherThingsWrite;