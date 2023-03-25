/* eslint-disable no-undef */
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('type', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else {
    return ''
  }

})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)})
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const cantidad = persons.length
    const respuesta =
            `<p>Phonebook has info for ${cantidad} persons </p>
            <p>${new Date()}</p>`
    response.send(respuesta)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {next(error)})
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if(persons.find(person => person.name === body.name)) {
  //     return response.status(404).json({"error":"Duplicated name"})
  // }
  const person = new Person ({
    'name': body.name,
    'number': body.number,
  })

  person.save().then(newPerson => response.json(newPerson)).catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    'name' : body.name,
    'number': body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { 'new': true, runValidators: true, context: 'query' })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})