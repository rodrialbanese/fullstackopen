import axios from "axios";
const API_WEATHER = process.env.REACT_APP_WEATHER_API

const getWeather = (lat,lng) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_WEATHER}&units=metric`);
    return request.then((response) => response.data);
  };

// eslint-disable-next-line
export default { getWeather};