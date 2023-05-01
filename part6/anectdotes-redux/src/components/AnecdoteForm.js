import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const anecdote  = event.target.anecdote.value
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`You created ${anecdote}`, 5))
        event.target.anecdote.value = ""
    }

    return (
      <form onSubmit={addNote}>
        <h1> New Anecdote </h1>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
    )
  }
  
  export default AnecdoteForm