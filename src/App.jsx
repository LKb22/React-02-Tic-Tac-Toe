// Imports:

// Import useState from React
import { useState } from "react";

// Import the Player component
import Player from "./components/Player.jsx";

// Import the GameBoard component
import GameBoard from "./components/GameBoard.jsx";

// Import the Log component
import Log from "./components/Log.jsx";

// Checking for a Match STEP 0: The easiest solution is to check for a winning combination after every turn and then to display this winning combination in the UI once there is a match. We created an array containing all of the winning combinations in the winning-combinations.js file. We can now import this array into the App component and use it to check for a match after every turn.
// Import the winning combinations array
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// Variables:
// Checking for a Match STEP 3.1: Move the initialgameBoard to the App component along with the gameBoard state:
// STEP 1: Create a constant variable to store the initial game board state. Use an array of arrays to build a grid of cells as the game board. In the initial state, since no cells have been selected, their default values are null.
const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

// Helper functions:
// Deriving state active player STEP 3: HELPER FUNCTION: Now that we have similar code to derive the active player, but with one code block taking the gameTurns state value directly and the other taking the prevTurns value, we can refactor this into a helper function that instead accepts these vlues as arguements to make it dynamic and avoid the duplicate code.
function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
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

  // Checking for a Match STEP 2.1: Move the gameBoard to the App component so that we can compare it to the winning combinations array here:

  // Lifting the state up Turn Log STEP 6:

  // Add the logic to derive the gameboard from the gameTurns state (stored in the turns prop - REFACTORED: now the gameTurns state directly in the App component). Basically, turn the gameTurns array of objects stored in the Turns prop into the gameBoard. Start with a variable ('gameBoard') and use the initialGameBoard state for its value as a starting point. Then, override this gameBoard variable with data derived from turns, but only if we have turns. Use a for loop to achieve this, as it will only execute if we have turns to loop over. Then, in the loop, destructure the turn to extract the info about the turn that occured, that being both the square, containing the row and column indexes of the cell that was clicked, and the player, 'X or 'O', that clicked it (object destructuring twice - the player symbol and the row and column). Now, we can go to the gameBoard variable and update the cell at the derived row and col ( gameBaord[row][col]), with the current player symbol ( = player).

  // DERIVING STATE:
  // This is an example of deriving state- as we don't need to manage any state here. Instead, we are producing some derived state / some computed value (gameBoard) based on a state (the gameTurns state stored in the turns prop). We are not storing this state in the GameBoard component, but rather in the App component. Therefore, we can remove the useState hook and the gameBoard state here. This is good practice in React, as we should manage as little state as needed and try to derive as much info and as many values as possible from that state.

  // Checking for a Match STEP 4: Now that we've moved and are computing / deriving the gameboard here in the App component, we are iterating directly through the gameTurns state value, not the turns prop that carried this value to the GameBoard component.
    // 	for (const turn of turns) {

	let gameBoard = initialGameBoard;

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}


  // Checking for a Match STEP 1: Here again, we don't need to create and manage another state in order to check for a match. The gameTurns state already gives us all of the information we need, and we're updating that state after every turn, in turn re-executing the App component function every time. So, again, we can simply 'derive' the state. We can use a for loop to go through all of the winning combinations in the WINNING_COMBINATIONS array and look for a match. Of course, that means we also need the most recent gameboard after every turn to compare it to. The gameboard is currently in the GameBoard component. The simplest solution is to move this code to the App component to make it accessible here. This also means that we will no longer be computing the value of the gameboard in the GameBoard component, but rather here in the App component.

  // Checking for a Match STEP 7: Now that we have the gameBoard here in the App component directly, we can extract the different symbols stored in that gameBoard from the positions that are defined by our winning combinations.
  for ( const combination of WINNING_COMBINATIONS ) {
    const firstSquareSymbol =
    const secondSquareSymbol =
    const thirdSquareSymbol =
  }

	// Lifting the state up Active Player STEP 2: Create the function to toggle the active player between 'X' and 'O'. It calls the update state function ('setActivePlayer'), receives the current state value as an argument, and then updates that state value through that function based on the previous state value by toggling between 'X' and 'O'. We need to make sure this function gets executed when a square is selected, so that the active player changes after each turn. Since squares are selected in the gameBoard component, we need to pass this function as a prop to the gameBoard component, so that it can be called there.

	// Lifting the state up Turn Log STEP 4: As mentioned, we already have this function that is called when a square is selected. We can use this function to handle both the gameBoard and Log logic. For the new setGameTurns update state function, we can use the same 'function form' syntax and 'immutability' principles approach, since the new turns array will depend on the old turns array. So, create a new constant object ('updatedTurns'), make a copy of the existing turns ('prevTurns') using the spread operator, and insert the new turn {} in front of the old turns so that the first item in the array is the most recent turn. As mentioned, each turn is an object. This object stores the square that was clicked, based on the row and cell indexes, and the player that clicked it, based on the activePlayer state value. However, we should avoid using activePlayer here directly, so that we are not 'mixing' two different states, and because we cannot guarentee that the activePlayer state value is the most recent one when the state update function is called. Instead, declare a new variable ('currentPlayer') set to 'X' as default. Then, add an if statement to check if the most recent turn, that being the first element/object of the prevTurns array, which is actually the most recent gameTurns array, has a player value of 'X'. If so, set the currentPlayer variable to 'O' to toggle between 'X' and 'O'. Only do this if the array is not empty (it is empty by default). Set this new variable storing the current player value on the player property in the 'updatedTurns' object. Set the dynamic row and col index values on the row and cal properties in the square object - these values are passed as arguements from the GameBoard component. Finally, return the updatedTurns array.

	function handleSelectSquare(rowIndex, colIndex) {
		// Deriving state active player STEP 5: Replace this code with the helper function, passing the prevTurns state value as an arguement.setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
		setGameTurns((prevTurns) => {
			// let currentPlayer = "X";
			// if (prevTurns.length > 0 && prevTurns[0].player === "X") {
			// 	currentPlayer = "O";
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

        We can now derive the gameboard from the gameTurns state. Pass the gameTurns to the GameBoard component with a prop 'turns'. Finally, as a last step for 'Lifting the state up Turn Log', pass it to the Log as well.

        // Checking for a Match STEP 5: Since we are now computing / deriving the gameBoard directly here in the App as a value, we can simply pass it directly to the GameBoard component with a new prop, replacing the turns prop that passed the gameTurns state value carrying the gameBoard data to the gameBoard component, where the gameboard was then computed / derived from this data. Update the GameBoard component to accept this new prop and use it to render the gameboard.
          turns={gameTurns}
        */}
				<GameBoard
					onSelectSquare={handleSelectSquare}
					board={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
