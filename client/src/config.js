import axios from "axios";
 const axiosInstance = axios.create ({
    baseURL : "https://student-helpline-blog.herokuapp.com/api/"
})
export default axiosInstance