import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';
import "./bldWrite.css"

const BldWrite = () => {
    const [location, setLocation] = useState("");
    const [group, setGroup] = useState("");
    const [bags, setBags] = useState(""); 
    const [time, setTime] = useState("");
    const [contact, setContact] = useState("");
    const [patientState, setPatientState] = useState("");
    const [desc, setDesc] = useState("");

    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          userId:user._id, 
          location,
          desc, group, time, bags, patientState, contact
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
          await axiosInstance.post("/blood", newPost);
          window.location.reload();
        } catch (err) {}
      };
    return (
        <div className="write">


        <div className="write-body">
        <span className="write-title">Create a post</span> <br />
        <form  onSubmit={handleSubmit}>

        <label for="Group">Blood Group:</label>
                    <select onChange={(e) =>  {setGroup(e.target.value)    

                    }
                    
                    } name="Group" id="Group">
                      <option value="A Positive">A+</option>
                      <option value="A Negative">A-</option>
                      <option value="B Positive">B+</option>
                      <option value="B Negative">B-</option>
                      <option value="AB Positive">AB+</option>
                      <option value="AB Negative">AB-</option>
                      <option value="O Positive">O+</option>
                      <option value="O Negative">O-</option>
                    </select>  <br /> <br />



          <input  
              type="text"
              className="form-control"
              placeholder="Location"
              onChange={e=>setLocation(e.target.value)}
            ></input> <br />

            <input
              placeholder="Tell time"
              className="form-control"
              type="text"
              // className="writeInput writeText"
              onChange={e=>setTime(e.target.value)}
            ></input> <br />

            <input
              placeholder="Tell Bags"
              className="form-control"
              type="text"
              // className="writeInput writeText"
              onChange={e=>setBags(e.target.value)}
            ></input> <br />


            <textarea
              placeholder="Tell patient State"
              className="form-control"
              type="text"
              // className="writeInput writeText"
              onChange={e=>setPatientState(e.target.value)}
            ></textarea>  <br />
            
            
          
            
              <input
              placeholder="Tell contact"
              className="form-control"
              type="text"
              // className="writeInput writeText"
              onChange={e=>setContact(e.target.value)}
            ></input> <br />


        {file && (
          <img className="writeImg" style={{height: '100px', width: '100px'}} src={URL.createObjectURL(file)} alt="" />
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
              className="form-control"
              type="text"
              // className="writeInput writeText"
              onChange={e=>setDesc(e.target.value)}
            ></textarea> <br />

        
          <button className="btn btn-primary" type="submit">
            Publish
          </button>
        </form>
        </div>

      </div>
    );
};

export default BldWrite;