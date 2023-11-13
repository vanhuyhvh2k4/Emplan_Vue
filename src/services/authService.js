import * as request from "@/utils/httpRequest.js";

export const register = async (payload) => {
    try {
        const res = await request.post('register', payload);
        return res;
    } catch (error) {
        return error;
    }
}

export const login = async (payload) => {
    try {
        const res = await request.post('login', payload);
        return res;
    } catch (error) {
        return error;
    }
}

export const verifyEmail = async (userId, payload) => {
    try {
        const res = await request.post(`verify/${userId}`, payload);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}