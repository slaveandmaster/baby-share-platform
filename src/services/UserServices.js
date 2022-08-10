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

export const getUserReview = async (userId) => {
    try {
        const result = await api.get(`${BASE_URL}/api/users/${userId}`);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const createReview = (userId, rating, comment) => {
    try {
        const result = api.post(`${BASE_URL}/api/review/${userId}`, {rating, comment});
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getTopUsers = () => {
    try {
        const result = api.get(`${BASE_URL}/api/topreview`);
        return result;
    } catch (error) {
        console.log(error);
    }
}