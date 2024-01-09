import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import Filter from './components/Filter';
import Notification from './components/Notification';
import Form from './components/Form';
import apiService from './services/api';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [message, setMessage] = useState(null);
	const [newNumber, setNewNumber] = useState('');
	const [allPersons, setAllPersons] = useState([]);
	const [newFilter, setNewFilter] = useState('');
	const [newName, setNewName] = useState('');

	useEffect(() => {
		apiService.getAll().then((initialPersons) => {
			setAllPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const person = allPersons.filter((person) => person.name === newName);

		const personToAdd = person[0];
		const updatedPerson = { ...personToAdd, number: newNumber };

		if (person.length !== 0) {
			if (
				window.confirm(
					`${personToAdd.name} is already added to the phonebook, replace the old number with a new one ?`
				)
			) {
				apiService
					.update(updatedPerson.id, updatedPerson)
					.then((returnedPerson) => {
						setAllPersons(
							allPersons.map((personItem) =>
								personItem.id !== personToAdd.id ? personItem : returnedPerson
							)
						);
						console.log(`${returnedPerson.name} successfully updated`);
						setNewName('');
						setNewNumber('');
						setMessage(`${updatedPerson.name} was successfully updated`);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					})
					.catch((error) => {
						console.log(error);
						setAllPersons(
							allPersons.filter((person) => person.id !== updatedPerson.id)
						);
						setNewName('');
						setNewNumber('');
						setMessage(
							`[ERROR] ${updatedPerson.name} was already deleted from server`
						);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
		} else {
			const personToAdd = {
				name: newName,
				number: newNumber,
			};
			apiService
				.create(personToAdd)
				.then((returnedPerson) => {
					setAllPersons(allPersons.concat(returnedPerson));
					setNewName('');
					setNewNumber('');
					setMessage(`${newName} was successfully added`);
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				})
				.catch((error) => {
					setMessage(`[ERROR] ${error.response.data.error}`);
					setTimeout(() => {
						setMessage(null);
					}, 5000);
					console.log(error.response.data);
				});
		}
	};

	const deletePerson = (id) => {
		const filteredPerson = allPersons.filter((person) => person.id === id);
		const personName = filteredPerson[0].name;
		const personId = filteredPerson[0].id;
		if (window.confirm(`Delete ${personName} ?`)) {
			apiService.remove(personId);
			console.log(`${personName} successfully deleted`);
			setMessage(`${personName} was successfully deleted`);
			setAllPersons(allPersons.filter((person) => person.id !== personId));
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
		const regex = new RegExp(newFilter, 'i');
		const filteredPersons = () =>
			allPersons.filter((person) => person.name.match(regex));
		setPersons(filteredPersons);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter value={newFilter} onChange={handleFilterChange} />
			<h2>Add new person</h2>
			<Form
				onSubmit={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Content
				persons={persons}
				allPersons={allPersons}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
