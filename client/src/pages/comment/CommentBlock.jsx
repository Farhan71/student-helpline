import React from 'react';
import CommentAll from './CommentAll';
import CommentWrite from './CommentWrite';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axiosInstance from "../../config";

const CommentBlock = () => {
    const [comments, setComments] = useState([]); 
    const loc = useLocation();
    const path = loc.pathname.split("/")[2];
    console.log(path)
    useEffect(() =>{
        const fetchComments = async () => {
            const res = await axiosInstance.get(`/comment?postID=${path}`);
            setComments(res.data)
        };
        fetchComments();
    },[])
    return (
        <div className="card" style={{marginTop: "100px"}}>
            <div className="card-body">
                <div className="card-title"> Write a comment: </div>
                
            <CommentWrite postID={path} ></CommentWrite> <br />
            <div >
            <CommentAll comments={comments}></CommentAll>
            </div>

            </div>
            
        </div>
    );
};

export default CommentBlock;