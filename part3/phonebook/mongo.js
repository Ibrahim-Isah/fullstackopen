/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/fullstack';

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

Note.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
});

const note = new Note({
  content: 'Browser can execute only JavaScript',
  important: true,
});

// note.save().then((result) => {
// 	console.log('note saved!', result);
// 	mongoose.connection.close();
// });
