import axios from 'axios'

const axiosIns=axios.create({
    baseUrl :"http://localhost:3000",
    headers:{
        'Content-Type' : 'application/json'
    }
})



export default axiosIns;