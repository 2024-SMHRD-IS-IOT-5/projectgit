import axios from 'axios'

const axiosIns=axios.create({
    baseUrl :"http://localhost:3001",
    headers:{
        'Content-Type' : 'application/json'
    }
})



export default axiosIns;