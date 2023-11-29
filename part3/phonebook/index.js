const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

morgan.token('custom', (req) => {
	return 'POST' === req.method ? JSON.stringify(req.body) : ' ';
});

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :custom'
	)
);
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/info', (req, res) => {
	const response = `
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
		`;
	res.send(response);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.post('/api/persons', (req, res) => {
	const person = req.body;

	if (!person.name || !person.number) {
		return res.status(404).json({
			error: 'Name and Number are required.',
		});
	}

	if (
		persons.find(
			(person) => person.name.toLowerCase() === person.name.toLocaleLowerCase()
		)
	) {
		return res.status(404).json({
			error: 'name must be unique',
		});
	}

	const maxId =
		persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

	console.log(maxId, 'the maxId');
	person.id = maxId + 1;

	persons = persons.concat(person);
	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	persons = persons.filter((person) => person.id !== Number(req.params.id));
	res.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
