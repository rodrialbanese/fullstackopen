const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})

// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()
// const app = express()
// const Note = require('./models/note')


// app.use(express.static('build'))
// app.use(express.json())
// app.use(cors())

//   app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
//   })
  
//   app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//       response.json(notes)
//     })
//   })

//   app.get('/api/notes/:id', (request, response, next) => {
//     Note.findById(request.params.id)
//       .then(note => {
//         if (note) {
//           response.json(note)
//         } else {
//           response.status(404).end()
//         }
//       })
//       .catch(error => {next(error)})
//   })

//   app.delete('/api/notes/:id', (request, response, next) => {
//     Note.findByIdAndRemove(request.params.id)
//       .then(result => {
//         response.status(204).end()
//       })
//       .catch(error => next(error))
//   })

    
//   app.post("/api/notes", (request,response, next) => {
//     body = request.body

//     if (!body.content) {
//       return response.status(400).json({error: "Content missing"})
//     }

//     const note = new Note ({
//       "content" : body.content,
//       "important": body.important || false,
//     })
    
//     note.save().then(savedNote => {response.json(savedNote)}).catch(error => next(error))
//   })

//   app.put('/api/notes/:id', (request, response, next) => {
//     const { content, important } = request.body
  
//     Note.findByIdAndUpdate(
//       request.params.id, 
//       { content, important },
//       { new: true, runValidators: true, context: 'query' }
//     ) 
//       .then(updatedNote => {
//         response.json(updatedNote)
//       })
//       .catch(error => next(error))
//   })

//   const errorHandler = (error, request, response, next) => {
//     console.error(error.message)
  
//     if (error.name === 'CastError') {
//       return response.status(400).send({ error: 'malformatted id' })
//     } else if (error.name === 'ValidationError') {
//       return response.status(400).json({ error: error.message })
//     }
  
//     next(error)
//   }
  
//   const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }
  
//   // handler of requests with unknown endpoint
//   app.use(unknownEndpoint)
  
//   // this has to be the last loaded middleware.
//   app.use(errorHandler)

//   const PORT = process.env.PORT
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })