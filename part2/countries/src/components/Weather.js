const Weather = ({weather, country}) => {
    if (weather && country) {
        console.log("en weather")
        return (
            <div>
                <h1>Weather in {country.capital[0]}</h1>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img style={{backgroundColor: 'gray'}} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        )
    }
    else {
        return null
    }
}
export default Weather