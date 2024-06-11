import axios from 'axios'
import {ACCESS_TOKEN} from './constants'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //? Get the API URL from the environment variables
})

api.interceptors.request.use( //? Add a request interceptor to add the Authorization header to the request
    (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`//? Add the Authorization header to the request
    }
    return config
   },
   (error) => {
    return Promise.reject(error)
   }
) //? Add a request interceptor to add the Authorization header to the request

export default api