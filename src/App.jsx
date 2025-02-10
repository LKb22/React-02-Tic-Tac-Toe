// Import useState from React
import { useState } from "react";

// Import the Player component
import Player from "./components/Player.jsx";

// Import the GameBoard component
import GameBoard from "./components/GameBoard.jsx";

// Import the Log component
import Log from "./components/Log.jsx";

// Deriving state active player STEP 3: HELPER FUNCTION: Now that we have similar code to derive the active player, but with one code block taking the gameTurns state value directly and the other taking the prevTurns value, we can refactor this into a helper function that instead accepts these vlues as arguements to make it dynamic and avoid the duplicate code.
function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "0";
	}
	return currentPlayer;
}

// App component to render the game:
function App() {
	// Lifting the state up:
	// "Lift the state up to the CLOSEST ANCESTOR COMPONENT that has access to all of the components that need to work with that state." - React Docs

	// Lifting the state up Turn Log STEP 0: We want to 'log' the order/history of these 'turns' over the course of the game and display that log in the UI dynamically to the players. Therefore, we've created a new Log component. IMPORTANT: The GameBoard state variable already stores the information of when a button is clicked, including which button, and by which player. And, since we essentially need that same info for the log component, and we want to keep our code DRY (we don't want to create a new state to store the same info as an existing state), we can lift that GameBoard state up to the App Component to make it accessible to the log. However, this current gameBoard state variable does not actually track the order/the history of those clicks. So, we will still lift it up but actually replace it with a new state ('gameTurns') to track the same info PLUS the order/history of those clicks in one place. Essentially, this new state variable will be an array of objects. Whenever a square is clicked, a new turn will be added to the array. That means each object represents one turn, showing which player clicked which square, while the array logs the order/history of these turns. We can start by refactoring the GameBoard to move the onClick event handling to the app component.

	// Lifting the state up Turn Log STEP 3: Create the state variable to store the log of turns. We'll use an array to dynamically store the turns. The initial state is an empty array to begin with.
	const [gameTurns, setGameTurns] = useState([]);

	// Lifting the state up Active Player STEP 0: We need to know who the currently active player is in both the player component and the gameboard component, respectively, in order to dynamically add a css class to the list item displaying the player name and to know the symbol of the active player to fill the board accurately. This is a common case in react, that different components need to share the same state. In this case, the App component is the ancestor component that can pass the information ('the currently active player') to both components VIA PROPS.

	// Lifting the state up Active Player STEP 1: Create a state variable to store the currently active player. The initial state is 'X'.

	// REFACTORED:
	// const [activePlayer, setActivePlayer] = useState("X");

	// Deriving state active player STEP 0: Now that we have created the gameTurns state, we can instead derive the active player directly from that GameTurns state value. This way, we can get rid of the activePlayer state entirely, which would then only be left to trigger a UI update following this change. So, instead of having a dedicated activePlayer state, we will add a derived state.

	// Deriving state active player STEP 1: We can use the existing code logic to set a default player ('X') and toggle between 'X' and 'O' based on the current gameTurns state value.
	// let currentPlayer = "X";
	// 		if (gameTurns.length > 0 && gameTurns[0].player === "X") {
	// 			currentPlayer = "0";
	// 		}

	// Deriving state active player STEP 4: Replace this code with the helper function, passing the gameTurns state value as an arguement.
	const activePlayer = deriveActivePlayer(gameTurns);

	// Lifting the state up Active Player STEP 2: Create the function to toggle the active player between 'X' and 'O'. It calls the update state function ('setActivePlayer'), receives the current state value as an argument, and then updates that state value through that function based on the previous state value by toggling between 'X' and 'O'. We need to make sure this function gets executed when a square is selected, so that the active player changes after each turn. Since squares are selected in the gameBoard component, we need to pass this function as a prop to the gameBoard component, so that it can be called there.

	// Lifting the state up Turn Log STEP 4: As mentioned, we already have this function that is called when a square is selected. We can use this function to handle both the gameBoard and Log logic. For the new setGameTurns update state function, we can use the same 'function form' syntax and 'immutability' principles approach, since the new turns array will depend on the old turns array. So, create a new constant object ('updatedTurns'), make a copy of the existing turns ('prevTurns') using the spread operator, and insert the new turn {} in front of the old turns so that the first item in the array is the most recent turn. As mentioned, each turn is an object. This object stores the square that was clicked, based on the row and cell indexes, and the player that clicked it, based on the activePlayer state value. However, we should avoid using activePlayer here directly, so that we are not 'mixing' two different states, and because we cannot guarentee that the activePlayer state value is the most recent one when the state update function is called. Instead, declare a new variable ('currentPlayer') set to 'X' as default. Then, add an if statement to check if the most recent turn, that being the first element/object of the prevTurns array, which is actually the most recent gameTurns array, has a player value of 'X'. If so, set the currentPlayer variable to 'O' to toggle between 'X' and 'O'. Only do this if the array is not empty (it is empty by default). Set this new variable storing the current player value on the player property in the 'updatedTurns' object. Set the dynamic row and col index values on the row and cal properties in the square object - these values are passed as arguements from the GameBoard component. Finally, return the updatedTurns array.

	function handleSelectSquare(rowIndex, colIndex) {
		// Deriving state active player STEP 5: Replace this code with the helper function, passing the prevTurns state value as an arguement.setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
		setGameTurns((prevTurns) => {
			// let currentPlayer = "X";
			// if (prevTurns.length > 0 && prevTurns[0].player === "X") {
			// 	currentPlayer = "0";
			// }

			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	return (
		<main>
			<div id="game-container">
				{/* Lifting the state up Active Player STEP 6: Now, we can add the 'highlight-player' className here to highlight the currently active player. */}
				{/* Lifting the state up Active Player STEP 7: We need to pass the information of who the currently active player is to the Player component through a prop so that we can add a classname dynamically. Of course, the currently active player, either X or O, is stored in the activePlayer state variable. We can create a conditional prop ('isActive') to pass to the player component that is either true or false for both players X and O based on the state value of activePlayer. */}
				<ol
					id="players"
					className="highlight-player"
				>
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === "O"}
					/>
				</ol>

				{/* Lifting the state up Active Player STEP 3: Pass the handleSelectSquare function as the value of a prop to the gameBoard component ('onSelectSquare'), so that it can be accessed and called there when a square is selected. */}

				{/* Lifting the state up Active Player STEP 9: We also need to pass the activePlayer state value to the gameBoard component, so that it can be used to fill the board with the correct symbol. Pass this value, either X or O, as a prop to the gameBoard component ('activePlayerSymbol').

          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>

        Lifting the state up Turn Log STEP 5: REFACTORED: We no longer need the activePlayer prop, since the game state has been lifted up from the GameBoard component to the App component here.

        We can now derive the gameboard from the gameTurns state. Pass the gameTurns to the GameBoard component with a prop 'turns'. Finally, as a last step for Lifting the state up Turn Log, pass it to the Log as well. */}
				<GameBoard
					onSelectSquare={handleSelectSquare}
					turns={gameTurns}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
