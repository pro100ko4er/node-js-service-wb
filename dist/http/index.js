import axios from "axios";
export default function createApiService(baseURL, bearerToken) {
    const api = axios.create({
        baseURL,
        withCredentials: true
    });
    if (bearerToken) {
        api.interceptors.request.use(config => {
            config.headers.Authorization = "Bearer " + bearerToken;
            return config;
        });
    }
    return api;
}
//# sourceMappingURL=index.js.map