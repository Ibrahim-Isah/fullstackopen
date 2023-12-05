const mongoose = require('mongoose');

mongoose
	.connect(process.env.MONGODB_LOCAL)
	.then(() => {
		console.log('connected to MongoDB');
	})

	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: {
		required: true,
		type: String,
		minlength: 3,
	},
	number: {
		required: true,
		type: String,
		minlength: 8,
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
