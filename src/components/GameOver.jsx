// Game over component STEP 0: Component that displays the final score and a button to restart the game. The component expects to receive the winner as a prop.

// GameOver Component:
export default function GameOver({ winner }) {
	return (
		<div id="game-over">
			<h2>Game Over!</h2>
			<p>{winner} wins!</p>
			<p>
				<button>Rematch!</button>
			</p>
		</div>
	);
}
