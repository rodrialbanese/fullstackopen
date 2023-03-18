const Form = ({onChange, value}) => {
    return(
    <form>
        Search Country <input onChange={onChange} value={value}></input>
    </form>
    )

}

export default Form