import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';
import "./bookWrite.css"

const BookWrite = () => {
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [department, setDepartment] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newPost = {
        username: user.username,
        userId:user._id,
        bookName, bookAuthor, quantity, department, price, 
        desc,  contact
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
        await axiosInstance.post("/books", newPost);
        window.location.reload();
      } catch (err) {}
    };
    return (

     
      
      
      <div className="write">

        <div className="write-body">
        <span className="write-title">Create a post</span> <br />
        <form onSubmit={handleSubmit}>

        <label for="Department">Choose a department:</label>
                    <select onChange={(e) =>  {
                      
                      setDepartment(e.target.value)    

                    }
                    
                    } name="Department" id="Department">
                      <option value="CSTE">CSTE</option>
                      <option value="FIMS">FIMS</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="ACCE">ACCE</option>
                      <option value="Microbiology">Microbiology</option>
                      <option value="English">English</option>
                      <option value="BBA">BBA</option>
                      <option value="ICE">ICE</option>
                      <option value="FTNS">FTNS</option>
                      <option value="ESDM">ESDM</option>
                      <option value="Economics">Economics</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Applied Math">Applied Math</option>
                      <option value="EEE">EEE</option>
                      <option value="SWE">SWE</option>
                    </select>  <br /> <br />



                    <input
            type="text"
            placeholder="Book Name"
            onChange={e=>setBookName(e.target.value)}
            className="form-control"
          /> <br />
        <input
            placeholder="Tell Book Author"
            type="text"
            onChange={e=>setBookAuthor(e.target.value)}
            className="form-control"
          ></input>

          <input
            placeholder="Tell quantity"
            type="text"
            
            onChange={e=>setQuantity(e.target.value)}
            className="form-control"
          ></input>

        <input
            placeholder="Tell price"
            type="text"
            
            onChange={e=>setPrice(e.target.value)}
            className="form-control"
          ></input>


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


        <button className="btn btn-primary"  type="submit">
          Publish
        </button>
      </form>
      </div>
    </div>
      
      
      
      
      
      
      
      
      
      
     
    //     <div className="write container">
    //   {file && (
    //     <img className="writeImg" style={{height: '200px', width: '200px'}} src={URL.createObjectURL(file)} alt="" />
    //   )}
    //   <form className="writeForm" onSubmit={handleSubmit}>
    //     <div className="writeFormGroup">
    //       <label htmlFor="fileInput">
    //         <i className="writeIcon fas fa-plus"></i>
    //       </label>
    //       <input
    //         type="file"
    //         id="fileInput"
    //         style={{ display: "none" }}
    //         onChange={(e) => setFile(e.target.files[0])}
    //       />
        
    //     </div>
       

    //     <label for="Department">Choose a department:</label>
    //                 <select onChange={(e) =>  {
                      
    //                   setDepartment(e.target.value)    

    //                 }
                    
    //                 } name="Department" id="Department">
    //                   <option value="CSTE">CSTE</option>
    //                   <option value="FIMS">FIMS</option>
    //                   <option value="Pharmacy">Pharmacy</option>
    //                   <option value="ACCE">ACCE</option>
    //                   <option value="Microbiology">Microbiology</option>
    //                   <option value="English">English</option>
    //                   <option value="BBA">BBA</option>
    //                   <option value="ICE">ICE</option>
    //                   <option value="FTNS">FTNS</option>
    //                   <option value="ESDM">ESDM</option>
    //                   <option value="Economics">Economics</option>
    //                   <option value="Agriculture">Agriculture</option>
    //                   <option value="Applied Math">Applied Math</option>
    //                   <option value="EEE">EEE</option>
    //                   <option value="SWE">SWE</option>
    //                 </select> 

    //         <input
    //         type="text"
    //         placeholder="Book Name"
    //         onChange={e=>setBookName(e.target.value)}
    //         className="form-control"
    //       /> <br />
    //     <input
    //         placeholder="Tell Book Author"
    //         type="text"
    //         onChange={e=>setBookAuthor(e.target.value)}
    //         className="form-control"
    //       ></input>

    //       <input
    //         placeholder="Tell quantity"
    //         type="text"
            
    //         onChange={e=>setQuantity(e.target.value)}
    //         className="form-control"
    //       ></input>

    //     <input
    //         placeholder="Tell price"
    //         type="text"
            
    //         onChange={e=>setPrice(e.target.value)}
    //         className="form-control"
    //       ></input>
          
          
         
    //       <textarea
    //         placeholder="Tell description"
    //         type="text"
            
    //         onChange={e=>setDesc(e.target.value)}
    //         className="form-control"
    //       ></textarea>
    //       <br />

    //       <input
    //         placeholder="Tell contact"
    //         type="text"
            
    //         onChange={e=>setContact(e.target.value)}
    //         className="form-control"
    //       ></input> <br />
        

    //     <button  type="submit">
    //       Publish
    //     </button>
    //   </form>
    // </div>



    
    );
};

export default BookWrite;