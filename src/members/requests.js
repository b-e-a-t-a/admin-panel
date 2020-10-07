import axios from "axios";

export const fetchMembers = () => {
  return axios.get("https://randomuser.me/api/?results=50");
};
