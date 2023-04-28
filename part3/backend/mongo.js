const mongoose = require("mongoose")

if (process.argv.length<3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://rodrialbanese:${password}@fullstack.1f8hkfv.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set("strictQuery",false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "Mongoose makes things easy test",
  date: new Date(),
  important: true,
})


note.save().then(() => {
  console.log("note saved!")
  mongoose.connection.close()
})


// Note.find({}).then(result => {
// 	result.forEach(note => {
// 		console.log(note)
// 	})
// 	mongoose.connection.close()
// })