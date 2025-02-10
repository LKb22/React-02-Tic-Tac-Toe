// Lifting the state up Turn Log STEP 8: Accept a prop to get the gameTurns state value from the App component. This value stored in the turns prop is an array of objects containing the history of all turns made in the game, with each object representing and holding the info for one turn. Display the info by mapping the turns prop to a list(ol) of list items(li). Each list item should say which player selected which square. Player is the player property of the turn object and the square is the square property, which is itself an object with row and col properties. Add a unique key, which can be the row-col combination, as that will always be unique. Use template literals - JS syntax for dynamic string construciton - to achieve this.

export default function Log({ turns }) {
	return (
		<ol id="log">
			{turns.map((turn) => (
				<li key={`${turn.square.row}${turn.square.col}`}>
					{turn.player} selected {turn.square.row}, {turn.square.col}
				</li>
			))}
		</ol>
	);
}
