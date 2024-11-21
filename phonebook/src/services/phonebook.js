import axios from "axios";

const baseUrl = "/api/persons";

const getAllPhonebook = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (newUser) => {
  const request = axios.post(baseUrl, newUser);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateNumber = (id, newUser) => {
  const request = axios.put(`${baseUrl}/${id}`, newUser);
  return request.then((response) => response.data);
};

export default { getAllPhonebook, addPerson, deletePerson, updateNumber };
