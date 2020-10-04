import axios from "axios";

export const fetchMentors = () => {
  return axios.get("https://reqres.in/api/users");
};

export const fetchMentor = mentorId => {
  axios.get(`https://reqres.in/api/users/${mentorId}`).then(response => {
    return response;
  });
};
