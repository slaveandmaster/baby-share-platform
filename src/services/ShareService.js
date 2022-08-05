import * as api from "../helpers/fetchwrapper";

const BASE_URL = "http://localhost:5000";

export const getAll = () => {
  const result = api.get(`${BASE_URL}/api/shares`);
  return result;
};
