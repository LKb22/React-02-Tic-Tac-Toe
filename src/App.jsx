// Import useState from React
import { useState } from "react";

// Import the Player component
import Player from "./components/Player.jsx";

// Import the GameBoard component
import GameBoard from "./components/GameBoard.jsx";

function App() {

  // Lifting the state up:
  // "Lift the state up to the CLOSEST ANCESTOR COMPONENT that has access to all of the components that need to work with that state." - React Docs
  // We need to know who the currently active player is in both the player component and the gameboard component, respectively, in order to dynamically add a css class to the list item displaying the player name and to know the symbol of the active player to fill the board accurately. This is a common case in react, that different components need to share the same state. In this case, the App component is the ancestor component that can pass the information ('the currently active player') to both components VIA PROPS.

  // Lifting the state up STEP 1: Create a state variable to store the currently active player. The initial state is 'X'.
  const [activePlayer, setActivePlayer] = useState('X');

  // Lifting the state up STEP 2: Create the function to toggle the active player between 'X' and 'O'. It calls the update state function ('setActivePlayer'), receives the current state value as an argument, and then updates that state value through that function based on the previous state value by toggling between 'X' and 'O'. We need to make sure this fucniton gets executed when a square is selected, so that the active player changes after each turn. Since squares are selected in the gameBoard component, we need to pass this function as a prop to the gameBoard component, so that it can be called there.
  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

	return (
		<main>
			<div id="game-container">
      {/* Lifting the state up STEP 6: Now, we can add the 'highlight-player' className here to highlight the currently active player. */}
      {/* Lifting the state up STEP 7: We need to pass the information of who the currently active player is to the Player component through a prop so that we can add a classname dynamically. Of course, the currently active player, either X or O, is stored in the activePlayer state variable. We can create a conditional prop ('isActive') to pass to the player component that is either true or false for both players X and O based on the state value of activePlayer. */}
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
            isActive={activePlayer === 'X'}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
            isActive={activePlayer === 'O'}
					/>
				</ol>

        {/* Lifting the state up STEP 3: Pass the handleSelectSquare function as the value of a prop to the gameBoard component ('onSelectSquare'), so that it can be accessed and called there when a square is selected. */}

        {/* Lifting the state up STEP 9: We also need to pass the activePlayer state value to the gameBoard component, so that it can be used to fill the board with the correct symbol. Pass this value, either X or O, as a prop to the gameBoard component ('activePlayerSymbol'). */}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
			</div>
		</main>
	);
}

export default App;
