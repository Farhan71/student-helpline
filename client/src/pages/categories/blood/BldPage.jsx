import React from 'react';
import { useEffect, useState } from "react";
import {axiosInstance} from "../../../config";
import BldPosts from './BldPosts';
import BldWrite from './BldWrite';
import { useLocation } from "react-router";
import "./bldPage.css"

const BldPage = () => {
    const [posts, setPosts] = useState([]);
    let [filter, setFilter] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    useLocation().search = filter

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/blood");
        setPosts(res.data);
      };
      fetchPosts();
    }, []);

    useEffect(() => {
      const fetchFilterPosts = async () => {
        const res = await axiosInstance.get(`/blood/?group=${filter}`);
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


<label for="Group">Choose Blood Group:</label>
                    <select onChange={(e) =>  {
                      filter="";
                      setFilter(e.target.value)    

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
                    </select> 
        <div className="row">
            <div className="col-md-6">
              {
                filter ? (<BldPosts posts={filterPosts}></BldPosts>) : (<BldPosts posts={posts}></BldPosts>)
              }
            
            </div>
            <div className="col-md-6">
              <div className="write-portion">
            <BldWrite></BldWrite>
            </div>
            </div>   
        </div>
       </div>
    );
};

export default BldPage;