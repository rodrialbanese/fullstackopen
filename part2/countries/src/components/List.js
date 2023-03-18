const List = ({countriesList, handleButton}) => {
    if (countriesList.length === 1) {
        return ""
    }

    const showCountries = countriesList.length < 10 ? 
    countriesList.map(c => {return(<div key={c.name.common}>{c.name.common} <button onClick={() => handleButton(c)}>show</button></div>)}) 
    : "Too many matches, specify another filter"
    return(
        <div>
            {showCountries}
        </div>
    )

}
export default List