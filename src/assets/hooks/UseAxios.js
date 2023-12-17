import axios from "axios";

const axiosurl=axios.create({
  baseURL:"https://grosary-shope-server.vercel.app",
})



const UseAxios = () => {
return axiosurl;

}

export default UseAxios;