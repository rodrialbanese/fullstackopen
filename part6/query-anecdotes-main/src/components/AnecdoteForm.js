import { useMutation, useQueryClient } from 'react-query'
import requestAnecdotes from "../requests/requestAnecdotes"
import { addNotification } from '../notificationContext'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const createAnecdoteMutation = useMutation(requestAnecdotes.addNew, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("anecdotes")
      dispatch(addNotification(`You added ${response.content}`))   
    }, 
    onError: (error) => {dispatch(addNotification(error.response.data.error))}
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
