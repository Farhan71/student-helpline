import React from 'react';
import { useEffect, useState } from "react";
import {axiosInstance} from "../../../config";
import OtherThingsPosts from './OtherThingsPosts';
import OtherThingsWrite from './OtherThingsWrite';
import { useLocation } from "react-router";
import "./otherThingsPage.css"


const OtherThingsPage = () => {
    const [posts, setPosts] = useState([]);
    let [filter, setFilter] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    useLocation().search = filter

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/otherThings");
        setPosts(res.data);
      };
      fetchPosts();
    }, []);

    useEffect(() => {
      const fetchFilterPosts = async () => {
        const res = await axiosInstance.get(`/otherThings/?type=${filter}`);
        console.log(res)
        setFilterPosts(res.data)
      };
      fetchFilterPosts();
    },[filter])
    console.log (posts)
    console.log (filterPosts)

    return (
        

        <div className="post-page container">

<label for="Type">Choose a type:</label>
                    <select onChange={(e) =>  {
                      filter="";
                      setFilter(e.target.value) }
                    
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

                   

        <div className="row">
        <div className="col-md-6">
                    {
                      filter ? (<OtherThingsPosts posts={filterPosts}></OtherThingsPosts>) : (<OtherThingsPosts posts={posts}></OtherThingsPosts>)
                    }
                    {/* <OtherThingsPosts posts={posts}></OtherThingsPosts>
                    {filter && <OtherThingsPosts posts={filterPosts}></OtherThingsPosts> } */}
        </div>
        <div className="col-md-6">
          <div className="write-portion">
            <OtherThingsWrite></OtherThingsWrite>
            </div>
        </div>

        </div>

        </div>
        
        
        
    );
};

export default OtherThingsPage;