import * as request from "@/utils/httpRequest.js";

export const register = async (payload) => {
    try {
        const res = await request.post('register', payload);
        return res;
    } catch (error) {
        return error;
    }
}