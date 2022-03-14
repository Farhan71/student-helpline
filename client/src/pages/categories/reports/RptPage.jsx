import React from 'react';
import { useEffect, useState } from "react";
import axiosInstance from "../../../config";
import RptPosts from './RptPosts';
import RptWrite from './RptWrite';
import "./rptPage.css";
import { useLocation } from "react-router";

const RptPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/reports");
        setPosts(res.data);
      };
      fetchPosts();
    }, []);
    return (

      <div className="post-page container">
        
        
        <div className="row">
            <div className="col-md-6">
            <RptPosts posts={posts}></RptPosts>
            </div>
            <div className="col-md-6">
              <div className="write-portion">
                
              <RptWrite></RptWrite>
                </div>
            
            </div>
        </div>

        </div>
    );
};

export default RptPage;