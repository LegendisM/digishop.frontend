import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { GET_API_ROUTE } from "@/constants/api.config";

const instance = axios.create({
    baseURL: GET_API_ROUTE('main', 'base')
});

instance.interceptors.request.use(function (config) {
    let token;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token");
    }
    if (token) {
        token = token?.slice(1, token.length - 1);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let status = error?.response?.status;
    if (status === 401) {
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/signin';
        }
        return;
    }
    return Promise.reject(error);
});

export const useAxios = makeUseAxios({
    axios: instance,
    defaultOptions: { manual: true },
});