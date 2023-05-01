import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const anecdoteSlice = createSlice( {
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes +1 }
      state = state.map(anecdote => anecdote.id === action.payload?changedAnecdote:anecdote)
      return state
    },
    addAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch, getState) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdoteDB = (id) => {
  return async (dispatch, getState) => {
    await anecdoteService.updateVotes(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
