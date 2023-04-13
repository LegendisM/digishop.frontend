import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { GetApiRoute } from "@/constants/api.config";

export const useAxios = makeUseAxios({
    axios: axios.create({
        baseURL: GetApiRoute('main', 'base')
    }),
    defaultOptions: { manual: true }
});