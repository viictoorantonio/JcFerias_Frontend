import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
    baseURL: 'http://localhost:9090', 
    headers: {
        'Content-Type': 'application/json', 
        'token': token
    }
})

export default api