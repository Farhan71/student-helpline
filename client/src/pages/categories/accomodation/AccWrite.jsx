import React from 'react';
import { useContext, useState } from "react";
import axiosInstance from "../../../config";
import {Context } from '../../../context/Context';


const AccWrite = () => {
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [member, setMember] = useState("");
  const [contact, setContact] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [desc, setDesc] = useState("");
  
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userId:user._id, 
      location,
      desc, rent, member, contact, locationDetails
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
      await axiosInstance.post("/accommodations", newPost);
      window.location.reload();
    } catch (err) {}
  };
    return (
        <div className="write">

        <div className="write-body">
        <span className="write-title">Create a post</span> <br />
        <form onSubmit={handleSubmit}>

        <label for="Location">Choose a location:</label>
        
          <select onChange={e=>setLocation(e.target.value)} name="Location" id="Location">
            <option value="Sonapur">Sonapur</option>
            <option value="Dotter Hat">Dotter Hat</option>
            <option value="Roshid Colony">Roshid Colony</option>
            <option value="Fokirpur">Fokirpur</option>
            <option value="Garage">Garage</option>
            <option value="Pouro Bajar">Pouro Bajar</option>
            <option value="Boro Mosjid">Boro Mosjid</option>
            <option value="Town Hall">Town Hall</option>
            <option value="Housing">Housing</option>
            <option value="Hospital Road">Hospital Road</option>
            <option value="Bus Stand">Bus Stand</option>
            <option value="Maijdee Bajar">Maijdee Bajar</option>
          </select> <br /> <br />
          <textarea
            placeholder="Tell location details"
            type="text"
            onChange={e=>setLocationDetails(e.target.value)}
            className="form-control"
          ></textarea>  <br />

        <input
            placeholder="Tell rent"
            type="text"
            onChange={e=>setRent(e.target.value)}
            className="form-control"
          ></input> <br />

          <input
            placeholder="Tell member"
            type="text"
            onChange={e=>setMember(e.target.value)}
            className="form-control"
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


        <button className="btn btn-primary"  type="submit">
          Publish
        </button>
      </form>
      </div>
    </div>
    );
};

export default AccWrite;