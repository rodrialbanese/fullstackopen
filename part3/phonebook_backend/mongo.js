/* eslint-disable no-undef */
const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://rodrialbanese:${password}@fullstack.1f8hkfv.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
else if (process.argv[3] && !process.argv[4]) {
  console.log ('Must indicate Number')
  mongoose.connection.close()
}
else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

