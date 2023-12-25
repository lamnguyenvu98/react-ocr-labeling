import axios from "axios";

export const SERVER_IP = import.meta.env.VITE_SERVER_IP;

const apiClient = axios.create({
        baseURL: SERVER_IP,
        withCredentials: true
    })

apiClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 401) {
            return Promise.reject("Unauthorized")
        }
        return Promise.reject(error)
    }
)

export const getAPI = (url) => {
    return apiClient.get(url)
}

export const putAPI = (url, data) => {
    return apiClient.put(url, data)
}

export const postAPI = (url, data) => {
    return apiClient.post(url, data)
}