// Lifting the state up Turn Log REFACTORED:
// Import the useState hook from React
// import { useState } from "react";

// Checking for a Match STEP 3: Move the initialgameBoard to the App component along with the gameBoard state:
// const initialGameBoard = [
// 	[null, null, null],
// 	[null, null, null],
// 	[null, null, null],
// ];

// GameBoard component to render the game board:
// Lifting the state up Active Player STEP 4: GameBoard accepts the onSelectSquare function as a prop, so that it can be called when a square is selected. This function is passed down from the App component, where it is defined and updates the active player state.

// Lifting the state up Active Player STEP 10: Accept the activePlayerSymbol prop from the App component. This prop stores the symbol of the currently active player. Add this prop dynamically to the handleSelectSquare function to update the selected square of the game board with the correct symbol- based on the currently active player, either X or O.

// Lifting the state up Turn Log STEP 2: Since we are not handling the gameBoard state here anymore, we can also get rid of the activePlayerSymbol prop, as this is now handled in the new gameTurns state directly in the App component.
// export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {

export default function GameBoard({ onSelectSquare, board }) {
  // Checking for a Match STEP 2: Move the gameBoard to the App component so that we can compare it to the winning combinations array there.
  //  let gameBoard = initialGameBoard;

  //  for (const turn of turns) {
  //    const { square, player } = turn;
  //    const { row, col } = square;

  //    gameBoard[row][col] = player;
  //  }

	// Lifting the state up Turn Log STEP 1: REFACTORED: We need to lift this state up and create a new state for it to manage both the gameboard and the log together in the App component. Therefore, we don't need this state here anymore. We can remove it.

	// // STEP 3: useState - We need to manage the state of the gameboard so that, when a player clicks a button, we can change and update the UI of that button with the players symbol without having to reload the page. The default value of useState / state value is the initialGameBoard state. Use destructuring as usual.
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// // STEP 4: Create the function that will handle the button click event. As the pointer function, this function handles the logic. Essentially, in this case, it calls the update state function ('setGameBoard') to A: get the current state value, it then B: updates/ changes that value, and then it C: passes it back as an arguement, using return, to the update state function to re-render the UI with the new state value.

	// //  A: Here, we want to replace the current gameboard with the new gameboard- meaning we'll update the gameboard based on its previous state (we don't want to lose the previous state / the progress of the game). Therefore, we should use the 'function form' of passing a function to the state updating function. In doing this - passing a function to the state updating function - this function receives the previous state as an arguement passed in automatically by React ('prevGameBoard').

	// // B: To update the gameboard correctly, we'll need to know exactly which row and which button/cell was clicked. We can use the unique keys (the 'indexes') we assigned to each row and button/cell to identify them, passing them as arguements to the function to make them accessible, and then calling them on the current array of arrays ('prevGameBoard') to get the specific cell.

	//   // IMPORTANT: Update object-state immutably. We should not mutate objects and arrays (reference values in JS) directly. This can lead to bugs. Instead, therefore, we should create and update a copy of the object or array ('updatedBoard') when working with object or array state values. As an array of arrays, we have to make copies of each sub array as well. Use the spread operator to create a shallow copy of the array (spread operator creates the copy), and .map to iterate over this copy of the array. Then, use an arrow function to get each 'innerArray'/row, and again the spread operator on the 'innerArray'/row to create copies of each one. Save this to a new variable ('updatedBoard') and return it.

	// // We also need to know which symbol to place in the cell. We can use the playerSymbol state and pass it as an arguement as well.

	// function handleSelectSquare(rowIndex, colIndex) {
	//   setGameBoard((prevGameBoard) => {
	//     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
	//     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
	//     return updatedBoard;
	//   });

	//   // Lifting the state up Active Player STEP 5: Call the onSelectSquare function here, since this handleSelectSquare pointer function is called when a square is selected (button onClick).
	//   onSelectSquare();
	// }

	return (
		<ol id="game-board">
			{/* STEP 2: Use .map to dynamically render the game board cells. Map takes a function as an input that will be called automatically for every item in the array. Each child array in the parent array represents a 'row', which shoud be a list item. React requires every item iterated with .map to have a unique key so that it can be identified. We can simply use the index as the key (this is not always best practice because the indexes can change/items can move places, but this won't happen in this case). Now, in each of the three arrays, represented by 'row' in our iteration, we need map again to iterate over their values and output the individual cells as buttons. Each button, in the initial state, has no value since it hasn't been clicked yet. When it's clicked, it will receive that player's symbol. Therefore, we can use {playerSymbol} to represent each button dynamically.

      STEP 6: Of course, we now want to use the 'gameBoard state snapshot' here instead of the ititial gameboard, so that the board being rendered is the one with the current state vaule. */}

			{/* STEP 5: Add onClick to the buttons to handle the click event, passing the handleSelectSquare as the pointer function that handles the logic of the click event. Use the trick of passing an anonymous function as the value to onClick, with the pointer inside of that function so that we can add arguements and control how/when it's called.  */}

      {/* Checking for a Match STEP 6: Now, we can render the gameboard with the new board prop from the App component, which already holds the current state of the game board as its value directly, since its now computed there, instead of using the gameBoard variable whose value was computed here in the GameBoard component using the gameTurns data passed through the turns prop. */}
			{board.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								{/* Lifting the state up Turn Log STEP 3: REFACTORED: Since the handleSelectSquare function in the app component will now handle the game state, we can pass the onSelectSquare prop, which holds this function as its value, directly as a value to the button onClick prop.

                Lifting the state up Turn Log STEP 7: TO RECAP - The handeSelectSquare function in the App component is triggered when a square is selected through the onSelectSquare prop given as a pointer function to the onClick here. This function accepts the selected row and col indexes as arguements so that it can update the gameTurns state value (array) with the information about the new turn. This info / gameTurns state is then passed to the GameBoard component through a prop, 'turns'. The gameBaord is then updated with the new info, and the UI is re-rendered. This means we must pass the row and col indexes to the onSelectSquare prop here, so that the function can access these values when its called.

                Add a disabled attribute to the button to prevent the player from clicking a square more than once. If the player symbol is X or O, then we know it has already been clicked. Therefore, if the playerSymbol is not null (is X or O), disable the button.
                */}
								<button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
