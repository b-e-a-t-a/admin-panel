import axios from "axios";

export const fetchMembers = (numberOfResults = 100) => {
  return axios.get(`https://randomuser.me/api/?results=${numberOfResults}`);
};
