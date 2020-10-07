import axios from "axios";

export const fetchMembers = () => {
  return axios.get("https://randomuser.me/api/?results=50");
};

export const fetchMember = memberId => {
  return axios.get(`https://reqres.in/api/users/${memberId}`);
};
