const Country = ({country}) => {
    if (country) {
        console.log("en country")
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
                </ul>
                <img src={country.flags.png} alt="Flag of the Country" />
            </div>
        )
    }
    else {
        return null
    }
}
export default Country