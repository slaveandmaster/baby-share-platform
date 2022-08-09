import * as api from "../helpers/fetchwrapper";

const BASE_URL = "http://localhost:5000";

export const getUserInfo = async (userId) => {
    try {
        const result = await api.get(`${BASE_URL}/api/users/${userId}`);
        return result;
    } catch (error) {
        console.log(error);
    }
}