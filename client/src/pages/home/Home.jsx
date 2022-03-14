import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axiosInstance from "../../config";
import { useLocation } from "react-router";
import AccPosts from "../categories/accomodation/AccPosts";
import BldPosts from "../categories/blood/BldPosts";
import OtherThings from "../categories/otherThings/OtherThingsPosts";
import RptPosts from "../categories/reports/RptPosts";
import EntPosts from "../categories/entrepreneur/EntPosts";
import BookPosts from "../categories/book/BookPosts"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Map from "../../components/Map/Map";
import AnalogClock from 'analog-clock-react';


export default function Home() {
  


  let options = {
    width: "200px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#6082c5",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    }
  }


  const [posts, setPosts] = useState([]);
  // const { search } = useLocation();
  let [filter, setFilter] = useState("");
    const [filterPosts, setFilterPosts] = useState([]);
    console.log(filter)
    

    useEffect(() => {
      const fetchFilterPosts = async () => {
        if (filter === "blood") {
          const res = await axiosInstance.get(`/blood`);
          setFilterPosts(res.data)
        }
        
        else if (filter === "accommodations") {
          const res = await axiosInstance.get(`/accommodations`);
          setFilterPosts(res.data)
        }

        else if (filter === "books") {
          const res = await axiosInstance.get(`/books`);
          setFilterPosts(res.data)
        }
        else if (filter === "reports") {
          const res = await axiosInstance.get(`/reports`);
          setFilterPosts(res.data)
        }
        else if (filter === "otherThings") {
          const res = await axiosInstance.get(`/otherThings`);
          setFilterPosts(res.data)
        }
        else if (filter === "entrepreneur") {
          const res = await axiosInstance.get(`/entrepreneur`);
          setFilterPosts(res.data)
        }
        
      };
      fetchFilterPosts();
      console.log(filter)
    },[filter])
    console.log(filterPosts)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axiosInstance.get("/posts" + search);
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [search]);
  // randerComponent(params)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/accommodations");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <div className="home container py-5">
        <div className="row ">
          <div className="col-md-8" >

          <label for="Category">Choose a Category:</label>
                    <select onChange={(e) =>  {
                      filter="";
                      setFilter(e.target.value)    
                    }               
                    } name="Category" id="Category">
                      <option value="accommodations">Accommodations</option>
                      <option value="blood"> Blood Finding</option>  
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="otherThings">Accesories</option>
                      <option value="reports">Reports</option>
                      <option value="books">Books</option>                    
                    </select>    <br /> <br />   
                    <div >
        { filter ? (
          {
            'accommodations' : <AccPosts posts={filterPosts}></AccPosts>,
            'blood' : <BldPosts posts={filterPosts}></BldPosts>,
            'entrepreneur' : <EntPosts posts={filterPosts}></EntPosts>,
            'otherThings' : <OtherThings posts={filterPosts}></OtherThings>, 
            'reports' : <RptPosts posts={filterPosts}>,</RptPosts>,
            'books' : <BookPosts posts={filterPosts}></BookPosts>
          }[filter] ) : <AccPosts posts={posts} ></AccPosts>
        }      

</div>
            </div>

            <div className="col-md-4"  >

              <div >
                <div style={{marginLeft: "60px"}}>
                <AnalogClock {...options} /> <br /> <br />
                  </div>
             
              <Calendar className="react-calendar" ></Calendar>
              </div>
              <div className="mt-5" >
              
                <Map></Map>
              </div>
              
            </div>
        </div>
     
      </div>
    </div>
  );
}
