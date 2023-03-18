const Country = ({country, weather}) => {
    if (country && weather) {
        console.log(weather)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
                <h1>Weather in {country.capital[0]}</h1>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img style={{backgroundColor: 'gray'}} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        )
    }
    else {
        return ""
    }
}
export default Country