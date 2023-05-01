import { useSelector, useDispatch } from "react-redux"
import { voteAnecdoteDB } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
  
    const vote = (id, content) => {
      dispatch(voteAnecdoteDB(id))
      dispatch(setNotification(`You voted ${content}`, 1))
      
    }
    const filteredAnecdotes = anecdotes.filter (anecdote=>anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  export default AnecdoteList