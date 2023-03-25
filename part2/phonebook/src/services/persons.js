import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
// eslint-disable-next-line
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const replace = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
  // const request = axios.delete(`${baseUrl}/${id}`);
  // return request.then((response) => response.data);
};

// eslint-disable-next-line
export default { getAll, create, remove, replace };
