import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from "./components/Form"
import List from "./components/List"
import Country from "./components/Country"

const API_WEATHER = process.env.REACT_APP_WEATHER_API
console.log(API_WEATHER)

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [countriesList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then((response) => {setCountries(response.data)
    console.log(response.data)})
  }, [])

  useEffect(() => {
      if (selectedCountry) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&appid=${API_WEATHER}&units=metric`)
        .then((response) => setWeather(response.data))
        .catch((error) => console.log(error))
      }
    }, [selectedCountry])

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    const _countries = countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setCountryList(_countries)
    if (_countries.length === 1) {
      setSelectedCountry(_countries[0])
    }
  };

  const handleButton = (selected) =>
    setSelectedCountry(selected) 

  return (
    <div>
      <Form onChange={handleCountryChange} value={country}/>
      <List countriesList={countriesList} handleButton={handleButton}/>
      <Country country={selectedCountry} weather={weather}/>
    </div>

  );
}

export default App;
