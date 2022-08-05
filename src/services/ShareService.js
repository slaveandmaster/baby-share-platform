import * as api from "../helpers/fetchwrapper";

const BASE_URL = "http://localhost:5000";

export const getAll = () => {
  const result = api.get(`${BASE_URL}/api/shares`);
  return result;
};

export const getById = async (shareId) => {
  try {
    const result = await api.get(`${BASE_URL}/api/shares/${shareId}`);
    const userInfo = {
        owner: result.ownerId[0]._id,
        username: result.ownerId[0].username,
        email: result.ownerId[0].email,
        isAdmin: result.ownerId[0].isAdmin
    }
    //console.log(result.ownerId[0]);
    return {result, userInfo};
  } catch (error) {
    console.log(error);
  }
};
