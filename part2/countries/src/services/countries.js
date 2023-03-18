import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
  };

// eslint-disable-next-line
export default { getAll };
