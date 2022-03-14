import React from 'react';
import AccPosts from "./AccPosts"
import AccWrite from "./AccWrite"
import "./accPage.css"
import { useEffect, useState } from "react";
import {axiosInstance} from "../../../config";
import { useLocation } from "react-router";

const AccPage = () => {
  

  // console.log(location.search)
  
    const [posts, setPosts] = useState([]);
    let [filter, setFilter] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    
    useLocation().search = filter
 

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/accommodations");
        console.log(res)
        setPosts(res.data);
      };
      fetchPosts();
    }, []);


    // const { search } = useLocation();
  
    useEffect(() => {
      const fetchFilterPosts = async () => {
        const res = await axiosInstance.get(`/accommodations/?location=${filter}`);
        console.log(res)
        setFilterPosts(res.data)
      };
      fetchFilterPosts();
    },[filter])

    // console.log (search)
    // console.log (filter)
    console.log (filterPosts)
    

  

    
    return (
      <div className="post-page container" > 

            <label for="Location">Choose a location:</label>
                    <select onChange={(e) =>  {
                      filter="";
                      setFilter(e.target.value)    
                    }                   
                    } name="Location" id="Location">
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
                    </select> 
         
      
      

            <div className="row">
                    <div className="col-md-6">

                      {
                        filter ? (<AccPosts posts={filterPosts}></AccPosts>) : (<AccPosts posts={posts}></AccPosts>)
                      }

{/* <AccPosts posts={posts}></AccPosts> */}
                    
                    </div>
                    <div className="col-md-6"  >
                      <div className="write-portion">
                      <AccWrite></AccWrite>
                      </div>
                    
            </div>
   
        </div>
      </div>
        
    );
};

export default AccPage;