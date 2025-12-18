import axios from "axios";


const axiosInstance=axios.create({
    baseURL:import.meta.MODE==='development'?'http://localhost:5000/api':import.meta.env.VITE_BACKEN_URL +'/api/',
    withCredentials:true
})

export default axiosInstance