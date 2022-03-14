import React from 'react';
import { useEffect, useState } from "react";
import axiosInstance from "../../../config";
import EntWrite from './EntWrite';
import EntPosts from './EntPosts';
import "./entPage.css"


const EntPage = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/entrepreneur");
        setPosts(res.data);
      };
      fetchPosts();
    }, []);
    return (

      <div className="post-page container">
        <div className="row">
            <div className="col-md-6">
            <EntPosts posts={posts}></EntPosts>
            </div>
            <div className="col-md-6">
              <div className="write-portion">
                
                
                
            <EntWrite></EntWrite>

            </div>
            </div>
            
            
        </div>

        </div>
    );
};

export default EntPage;