import { useState, useEffect } from 'react'
import Form from "./components/Form"
import List from "./components/List"
import Country from "./components/Country"
import Weather from './components/Weather'
import serviceCountries from './services/countries'
import serviceWeather from './services/weather'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [countriesList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  

  useEffect(() => {
    serviceCountries
    .getAll()
    .then(response => setCountries(response))
  }, [])

  useEffect(() => {
      if (selectedCountry && Object.keys(selectedCountry.capitalInfo).length>0) { // check if capitalInfo is in data (United States Minor Outlying Islands doesnt have capitalInfo)
        const lat = selectedCountry.capitalInfo.latlng[0]
        const lng = selectedCountry.capitalInfo.latlng[1]
        serviceWeather
        .getWeather(lat, lng)
        .then((response) => setWeather(response))
      }
      else {
        setWeather(null)
      }
    }, [selectedCountry])

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    const _countries = countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setCountryList(_countries)
    if (_countries.length === 1) {
      setSelectedCountry(_countries[0])
    }
    else {
      setSelectedCountry(null)
    }
  };

  const handleButton = (selected) => {
    console.log("selected", selected)
    setSelectedCountry(selected)}

  return (
    <div>
      <Form onChange={handleCountryChange} value={country}/>
      <List countriesList={countriesList} handleButton={handleButton}/>
      <Country country={selectedCountry}/>
      <Weather country={selectedCountry} weather={weather}/>

    </div>

  );
}

export default App;
