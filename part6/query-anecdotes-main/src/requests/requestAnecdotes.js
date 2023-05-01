import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

const addNew = (content) =>{
  const newAnecdote = {
    content,
    votes: 0
  }
  return axios.post(baseUrl, newAnecdote).then(res => res.data)}

  const update = (anecdote) =>{
    axios.patch(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNew, update }