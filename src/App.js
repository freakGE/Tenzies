import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import githubIMG from "./images/github.png";

export default function App() {
	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);

	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);

		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDice() {
		return {
			value: Math.floor(Math.random() * 6) + 1,
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		let newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDice());
		}
		return newDice;
	}

	const diceElements = dice.map((die) => (
		<Die
			holdDice={() => holdDice(die.id)}
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
		/>
	));

	function rollDice() {
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
		} else {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDice();
				})
			);
		}
	}

	function holdDice(id) {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
				})
			);
		}
	}

	return (
		<main>
			{tenzies && <Confetti />}

			<div className="platform">
				<a className="githubLink" href="https://github.com/freakGE">
					<img src={githubIMG} alt=""></img>
				</a>

				<div className="die-flex">
					<h1 className="title">
						<span className="textColor">T</span>enzies
					</h1>
					<p className="instructions">
						Roll until all dice are the same. Click each die to freeze it at its
						current value between rolls.
					</p>
					<div className="die-container">{diceElements}</div>
					<button onClick={rollDice} className="roll-dice">
						{tenzies ? "New Game" : "Roll"}
					</button>
				</div>
			</div>
		</main>
	);
}
