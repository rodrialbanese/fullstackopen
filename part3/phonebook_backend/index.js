const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/info", (request, response) => {
    cantidad = persons.length
    const respuesta = 
    `<p>Phonebook has info for ${cantidad} persons </p>
    <p>${new Date()}</p>`
    response.send(respuesta)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).json({"error": "Not found"})
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const randomId = () => {
    return Math.floor(Math.random() * 9999999999);
}

app.post("/api/persons", (request, response) => {
    body = request.body

    if(!body.name || !body.number) {
        return response.status(404).json({"error":"Content missing"})
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(404).json({"error":"Duplicated name"})
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": randomId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})