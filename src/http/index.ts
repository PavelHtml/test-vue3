import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://swapi.dev/",
});

export default apiClient;

