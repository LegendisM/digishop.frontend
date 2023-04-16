import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { GetApiRoute } from "@/constants/api.config";

const instance = axios.create({
    baseURL: GetApiRoute('main', 'base')
});

instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token");
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
        window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
});

export const useAxios = makeUseAxios({
    axios: instance,
    defaultOptions: { manual: true },
});