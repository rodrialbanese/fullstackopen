import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
    const object = { content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }
const updateVotes = async (id) => {
  const response = await axios.get(baseUrl)
  const anecdotes = response.data
  const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
  const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
  await axios.patch(`${baseUrl}/${id}`, changedAnecdote)
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVotes }