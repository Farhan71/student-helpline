import React from 'react';
import { useContext, useEffect, useState } from "react";
import {axiosInstance} from "../../config";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import AccPosts from '../../pages/categories/accomodation/AccPosts';
import BookPosts from '../../pages/categories/book/BookPosts'
import RptPosts from '../../pages/categories/reports/RptPosts'
import BldPosts from '../../pages/categories/blood/BldPosts'
import OtherThingsPosts from '../../pages/categories/otherThings/OtherThingsPosts'
import EntPosts from '../../pages/categories/entrepreneur/EntPosts'

const MyPosts = () => {
    const { user } = useContext(Context); 
    let [filter, setFilter] = useState("accommodations");
    const [filterPosts, setFilterPosts] = useState([]);
    useEffect(() => {
        const fetchFilterPosts = async () => {
          const res = await axiosInstance.get(`/${filter}?userId=${user._id }`);
          console.log(user._id)
          console.log(res.data)
          setFilterPosts(res.data)
        };
        fetchFilterPosts();
      },[filter, user._id])
      console.log(filterPosts)
      console.log(filter)
      // const seletedPosts = () => {
      //   if(filter)
      // }
    return (
        <div>
            <label>Choose a Category:</label>
                    <select onChange={(e) =>{
                      filter="";
                      setFilter(e.target.value)    
                    }                  
                    }>
                      <option value="accommodations">Accommodation</option>
                      <option value="books">Books</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="otherThings">Accessories</option>
                      <option value="blood">Blood Finding</option>
                      <option value="reports">Reports</option>
                    </select> 
                   

               {(() => {

        if (filter === "accommodations") {
          return (
            <AccPosts posts={filterPosts}></AccPosts>
          )
        }
        else if (filter === "books") {
          return (
            <BookPosts posts={filterPosts}></BookPosts>
          )
        }
        else if (filter === "entrepreneur") {
          return (
            <EntPosts posts={filterPosts}></EntPosts>
          )
        }
        else if (filter === "otherThings") {
          return (
            <OtherThingsPosts posts={filterPosts}></OtherThingsPosts>
          )
        }
        else if (filter === "blood") {
          return (
            <BldPosts posts={filterPosts}></BldPosts>
          )
        }
        else if (filter === "reports") {
          return (
            <RptPosts posts={filterPosts}></RptPosts>
          )
        }
        else if (filter === "") {
          return (
            <h1>click category</h1>
          )
        }
        
      })()}

                    {/* {

                        <AccPosts posts={filterPosts}></AccPosts>
                         
                      } */}
        </div>
    );
};

export default MyPosts;