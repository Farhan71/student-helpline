import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axiosInstance from "../../config";
import MyPosts from "../../components/myPosts/MyPosts";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isDonor, setIsDonor] = useState("");
  const [isEntrepreneur, setIsEntrepreneur] = useState("");
  const [ isReporter, setIsReporter] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://student-helpline-blog.herokuapp.com/images/"
  const userId = user._id 

  useEffect(() =>{
    const getId = async () => {
        const fetchUser = await axiosInstance.get(`users/${userId}`)
        
        setBloodGroup(fetchUser.data.bloodGroup)
        setIsDonor(fetchUser.data.isDonor)
        setIsEntrepreneur(fetchUser.data.isEntrepreneur)
        setIsReporter(fetchUser.data.isReporter)
        setContact(fetchUser.data.contact);
        setUsername(fetchUser.data.username) 
        setPassword(fetchUser.data.password)
        // setId(res.data)
    };
    getId();
}, [userId])

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/users/${user._id}`)
      // dispatch({ type: "LOGOUT" });
      // window.location.replace("/")
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      contact,
      password, bloodGroup, isDonor, isEntrepreneur, isReporter
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="container" style={{backgroundColor:"#f4f4f4"}}>
    <div className="row ">
      <div className="col-md-6">
      
      <br />
     
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          
          {/* <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span> */}
        </div>
       
          <label>Profile Picture</label>
          <div className="settingsPP">
    
            <img
              src={file ? (URL.createObjectURL(file) ) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />


          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            placeholder={user.contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <label>BloodGroup</label>
          <input
            type="text"
            className="form-control"
            placeholder={user.bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />

          <label>Donor</label>
          <input
            type="text"
            className="form-control"
            placeholder={user.isDonor}
            onChange={(e) => setIsDonor(e.target.value)}
          />

          <label>Entrepreneur</label>
          <input
            type="text"
            placeholder={user.isEntrepreneur}
            className="form-control"
            onChange={(e) => setIsEntrepreneur(e.target.value)}
          />

          <label>Reporter</label>
          <input
            type="text"
            placeholder={user.isReporter}
            className="form-control"
            onChange={(e) => setIsReporter(e.target.value)}
          />



          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* <button className="settingsSubmit" type="submit">
            Update
          </button> */}
          <button className="settingsSubmit" type="submit" onClick={handleSubmit}>
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
      
      </div>
      {/* <Sidebar /> */}
      

      </div>
    </div>


    <div className="col-md-6">
      <br />
      <div className="text-center">
      <h5> Your Posts</h5>
      </div>
    <MyPosts></MyPosts>
    </div>

    </div>
    </div>

  );
}
