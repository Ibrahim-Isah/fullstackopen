import { useState } from 'react';

const Header = (props) => {
	return <h1>{props.name}</h1>;
};

const Button = (props) => {
	return (
		<button
			onClick={props.onClick}
			style={{
				marginLeft: '20px',
			}}
		>
			{props.text}
		</button>
	);
};

const StatisticLine = (props) => {
	if (props.text === 'positive') {
		return (
			<tr>
				<td>{props.text}</td>
				<td>{props.value} %</td>
			</tr>
		);
	}
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const Statistics = (props) => {
	const all = props.good + props.neutral + props.bad;
	const average = (props.good - props.bad) / all;
	const positive = (props.good / all) * 100;

	if (all === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	}

	return (
		<table>
			<tbody>
				<StatisticLine text='good' value={props.good} />
				<StatisticLine text='neutral' value={props.neutral} />
				<StatisticLine text='bad' value={props.bad} />
				<StatisticLine text='all' value={all} />
				<StatisticLine text='average' value={average} />
				<StatisticLine text='positive' value={positive} />
			</tbody>
		</table>
	);
};

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};

	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<>
			<Header name='give feedback' />
			<Button onClick={handleGoodClick} text='good' />
			<Button onClick={handleNeutralClick} text='neutral' />
			<Button onClick={handleBadClick} text='bad' />
			<Header name='statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
}

export default App;
