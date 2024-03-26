import axios from 'axios'

// Create an axios instance with the base URL from environment variables and enabling credentials
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_HOST, withCredentials: true })

// Export the axios instance for making HTTP requests
export default axiosInstance
