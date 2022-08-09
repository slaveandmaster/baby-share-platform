import * as api from "../helpers/fetchwrapper";

const BASE_URL = "http://localhost:5000";

const login = (username, password) => {
  try {
    const result = api.post(`${BASE_URL}/api/auth/login`, { username, password });
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const register = (username, email, password) => {
  try {
    const result = api.post(`${BASE_URL}/api/auth/register`, {
      username,
      email,
      password,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const logout = async (token) => {
//   const result = fetch(`${BASE_URL}/api/auth/logout`, {
//     headers: {
//       "x-access-token": accessToken,
//     },
//   });
  const result = await api.post(`${BASE_URL}/api/auth/logout`, { token })
  console.log(result);
  return result;
};

export { login, register, logout };
