import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query' 
import requestAnecdotes from './requests/requestAnecdotes'
import { useNotificationDispatch, addNotification } from './notificationContext'



const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery("anecdotes", requestAnecdotes.getAll, {retry: 1})
  const dispatch = useNotificationDispatch()
    
  const updateAnecdoteMutations = useMutation(requestAnecdotes.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  
  if (result.status==="loading") {
    return <h1>Loading Data</h1>
  }
  if (result.status === "error") {
    return <h2>anecdote service not available due to problems in server</h2>
  }

  
  const handleVote = (anecdote) => {
    updateAnecdoteMutations.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch(addNotification(`You voted ${anecdote.content}`))
  }

  const anecdotes = result.data

  return (
    
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              handleVote(anecdote)
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default App
