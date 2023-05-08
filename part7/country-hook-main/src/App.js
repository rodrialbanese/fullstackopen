import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
      if (name!=="") {
      console.log("name diferente que ''")
      const getCountry = async (countryName) => {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
          return response // API returns an array of countries, so take the first one
        } catch (error) {
          console.error(error)
          return {notfound:true}
        }
      }

      const fetchData = async () => {
        const countryData = await getCountry(name)
        setCountry(countryData)
      }

      fetchData()
    }
    setCountry(null)
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  
  if (!country) {
    return null
  }

  if (country.notfound) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name.common} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flags.png} height='100' alt={`flag of ${country.data[0].name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  console.log(country)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App