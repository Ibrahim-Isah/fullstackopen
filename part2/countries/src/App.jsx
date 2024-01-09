import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
	const [countries, setCountries] = useState([]);
	const [showCountry, setShowCountry] = useState({});
	const [country, setCountry] = useState('');
	const [filterCountries, setFilterCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		setShowCountry(
			filterCountries.length === 1 ? { ...filterCountries[0] } : {}
		);
	}, [filterCountries]);

	const searchCountry = (e) => {
		setCountry(e.target.value);
		setFilterCountries(
			countries.filter(
				(country) =>
					country.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
			)
		);
	};

	const showCountries = () => {
		if (filterCountries.length <= 1) return;
		return filterCountries.map((country) => (
			<p key={country.name}>
				{country.name}
				<button onClick={() => setShowCountry(country)}>show</button>
			</p>
		));
	};

	return (
		<>
			<p>
				find countries{' '}
				<input value={country} name='country' onChange={searchCountry} />
			</p>
			{filterCountries.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : (
				showCountries()
			)}
			{showCountry.name && <Country data={showCountry} />}
		</>
	);
}

export default App;
