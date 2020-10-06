import axios from "axios";

export const fetchMentors = () => {
  return axios.get("https://reqres.in/api/users");
};

export const fetchMentor = mentorId => {
  return axios.get(`https://reqres.in/api/users/${mentorId}`);
};

export const removeMentor = mentorId => {
  return axios.delete(`https://reqres.in/api/users/${mentorId}`);
};

export const updateMentorData = (mentorId, data) => {
  return axios.put(`https://reqres.in/api/users/${mentorId}`, { data });
};
