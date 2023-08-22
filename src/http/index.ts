import axios from 'axios'

const apiClient = axios.create({
    baseURL: "https://swapi.dev/",
});

export default apiClient;

