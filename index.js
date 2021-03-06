const express = require('express');
const cors = require('cors');

var app = express();
app.use(express.static('build'));
var morgan = require('morgan');
app.use(morgan('combined'));
app.use(cors);

const persons = [
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
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const info = {
    amount: `Phonebook has info for ${persons.length} people.`,
    date: new Date()
  }

  res.json(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(x => x.id === id);

  if(person) {
    res.json(person);
  }

  res.status(404).end();
});

app.delete("/api/persons/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  if(persons.some(x => x.id === id)) {
    persons.filter(x => x.id !== id);
    res.json(persons);
  } else {
    res.status(404).end();
  }
});

const getRandomId = ()=> {
  return Math.floor(Math.random() * 100000);
}

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if(!person.name || !person.number) {
    res.status(404).json({
      error: "Person must have name and number."
    });
  }

  if(persons.find(x => x.name === person.name)) {
    res.status(404).json({
      error: "This name is already used."
    });
  }

  person.id = getRandomId();
  persons.concat(person);
  res.json(person);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listen on PORT: ${PORT}`)
});