// Game over component STEP 0: Component that displays the final score and a button to restart the game. The component expects to receive the winner as a prop.

// Game over component STEP 4: Render the winner conditionally. If there is a winner, display the winner's name. If there is no winner, display "It's a draw!" (since it must be a draw if there is no winner).

// Game over component STEP 6: We need to call our new function ('handleRestart') that resets the gameTurns array when the rematch button is clicked. Therefore, we should accept the function as a value of a prop ('onRestart') and pass it as the pointer function to onClick

// GameOver Component:
export default function GameOver({ winner, onRestart }) {
	return (
		<div id="game-over">
			<h2>Game Over!</h2>
			{winner && <p>{winner} wins!</p>}
			{!winner && <p>It's a draw!</p>}
			<p>
				<button onClick={onRestart}>Rematch!</button>
			</p>
		</div>
	);
}
