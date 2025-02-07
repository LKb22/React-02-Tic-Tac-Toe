// Import the useState hook from React
import { useState } from "react";

// STEP 1: Create a constant variable to store the initial game board state. Use an array of arrays to build a grid of cells as the game board. In the initial state, since no cells have been selected, their default values are null.
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

// GameBoard component to render the game board:
// Lifting the state up STEP 4: GameBoard accepts the onSelectSquare function as a prop, so that it can be called when a square is selected. This function is passed down from the App component, where it is defined and updates the active player state.

// Lifting the state up STEP 10: Accept the activePlayerSymbol prop from the App component. This prop stores the symbol of the currently active player. Add this prop dynamically to the handleSelectSquare function to update the selected square of the game board with the correct symbol- based on the currently active player, either X or O.

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {

  // STEP 3: useState - We need to manage the state of the gameboard so that, when a player clicks a button, we can change and update the UI of that button with the players symbol without having to reload the page. The default value of useState / state value is the initialGameBoard state. Use destructuring as usual.
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // STEP 4: Create the function that will handle the button click event. As the pointer function, this function handles the logic. Essentially, in this case, it calls the update state function ('setGameBoard') to A: get the current state value, it then B: updates/ changes that value, and then it C: passes it back as an arguement, using return, to the update state function to re-render the UI with the new state value.

  //  A: Here, we want to replace the current gameboard with the new gameboard- meaning we'll update the gameboard based on its previous state (we don't want to lose the previous state / the progress of the game). Therefore, we should use the 'function form' of passing a function to the state updating function. In doing this - passing a function to the state updating function - this function receives the previous state as an arguement passed in automatically by React ('prevGameBoard').

  // B: To update the gameboard correctly, we'll need to know exactly which row and which button/cell was clicked. We can use the unique keys (the 'indexes') we assigned to each row and button/cell to identify them, passing them as arguements to the function to make them accessible, and then calling them on the current array of arrays ('prevGameBoard') to get the specific cell.

    // IMPORTANT: Update object-state immutably. We should not mutate objects and arrays (reference values in JS) directly. This can lead to bugs. Instead, therefore, we should create and update a copy of the object or array ('updatedBoard') when working with object or array state values. As an array of arrays, we have to make copies of each sub array as well. Use the spread operator to create a shallow copy of the array (spread operator creates the copy), and .map to iterate over this copy of the array. Then, use an arrow function to get each 'innerArray'/row, and again the spread operator on the 'innerArray'/row to create copies of each one. Save this to a new variable ('updatedBoard') and return it.

  // We also need to know which symbol to place in the cell. We can use the playerSymbol state and pass it as an arguement as well.

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    // Lifting the state up STEP 5: Call the onSelectSquare function here, since this handleSelectSquare pointer function is called when a square is selected (button onClick).
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {/* STEP 2: Use .map to dynamically render the game board cells. Map takes a function as an input that will be called automatically for every item in the array. Each child array in the parent array represents a 'row', which shoud be a list item. React requires every item iterated with .map to have a unique key so that it can be identified. We can simply use the index as the key (this is not always best practice because the indexes can change/items can move places, but this won't happen in this case). Now, in each of the three arrays, represented by 'row' in our iteration, we need map again to iterate over their values and output the individual cells as buttons. Each button, in the initial state, has no value since it hasn't been clicked yet. When it's clicked, it will receive that player's symbol. Therefore, we can use {playerSymbol} to represent each button dynamically.

      STEP 6: Of course, we now want to use the 'gameBoard state snapshot' here instead of the ititial gameboard, so that the board being rendered is the one with the current state vaule. */}

      {/* STEP 5: Add onClick to the buttons to handle the click event, passing the handleSelectSquare as the pointer function that handles the logic of the click event. Use the trick of passing an anonymous function as the value to onClick, with the pointer inside of that function so that we can add arguements and control how/when it's called.  */}

      {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>)}
        </ol>
      </li>)}
    </ol>
  );
}
