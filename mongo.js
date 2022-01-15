const mongoose = require('mongoose')
const { stringify } = require('querystring')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

const note = new Person({
  name: "facu",
  phone: "1234"
})

note.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})