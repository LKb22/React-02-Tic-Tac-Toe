// Import useState from React
import { useState } from "react";

// Player component to render multiple players dynamically:
// IMPORTANT NOTE: React creates new isolated instances of components, allowing us to, for example, edit player one without affecting player two. This is why we can use the same Player component to render multiple players dynamically.

// Name and Symbol as props to output different players dynamically
export default function Player({ initialName, symbol }) {
	// State management to change the UI of the button. For this, we need useState. We can use useState multiple times to manage multiple 'pieces' of state. UseState returns an array with two elements - the current state value and a function that lets you update it - which we can store in a variable using destructuring.

	// useState for the editing state:
	// The information to store is a boolean- whether we are or are not in the editing state. We can set the initial state to false.
	const [isEditing, setIsEditing] = useState(false);

	// useState for the player name:
	// The information to store is the player name. We can set the default state 'name' to the name prop, now called 'initialName'.
	const [playerName, setPlayerName] = useState(initialName);

	// Create a function to toggle the state of isEditing
	function handleEditClick() {
		// Important: React 'schedules' state updates, meaning the state value you are currently working with ('isEditing') when calling the state update function ('setIsEditing') may not always be the most recent one, especially if you're changing the state multiple times in a row. Therefore, when updating your state based on the previous value of that state, you should pass a new function to the state update function. This is best practice, becuase react will call this new function and only then retreive the current state value or, in other words, it will automatically get the current state value at the actual point of time of when the scheduled state update is executed, guarenteeing the most recent state value as an input.
		setIsEditing((editing) => !editing);
	}

	// Create a function to handle the input change event
	// The function accepts an event object as an argument, which is sent by onChange and contains the value entered by the user. Get the value from the event object, and use it to update the player name state.
	function handleChange(event) {
		console.log(event.target.value);
		setPlayerName(event.target.value);
	}

	// Create a variable to output the content conditionally (based on the isEditing state). The default value is the player name span element
	let editablePlayerName = <span className="player-name">{playerName}</span>;

	// Create a variable to output the button text conditionally. The default value is 'edit'
	// let btnCaption = "Edit";

	// Check if the isEditing state is true.
	if (isEditing) {
		// If so, output an input field instead of the span name element
		editablePlayerName = (
			<input
				type="text"
				required
				// Use the value prop to set the default value of the input field to the player name dynamically
				value={playerName}
				// Use the onChange prop to listen to the input change event. Use the handleChange function as a pointer function to onChange so that it is called when the change event occurs (similar to the onClick event). Basically, onChange will trigger for every keystroke and provide an event object, as an argument to the pointer function, that contains the value entered by the user. Meaning, we should accept this event object in the handleChange pointer function and then use it to update the player name state.
        onChange={handleChange}

        // Two-way binding: Using value and onChange here, where we set a default value on the input, listen to a change on the input, and then feed that updated value back into the input (using state to manage the value), is called two-way binding. This is a common pattern in React, where, in react terms, you bind the value of an input field to a piece of state, and then update that state when the input changes. This way, the input field is always in sync with the state value, and vice versa.
			/>
		);

		// If so, change the button text to 'save'
		// btnCaption = "Save";
	}

	return (
		<li>
			<span className="player">
				{/* Output the playerName variable dynamically */}
				{editablePlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>

			{/* Add a dynamic value{} to make the button text conditional - either 'edit' or 'save' / dependent on the isEditing state. You can create a variable with the default value 'edit' and then update this is the ixisting if statement, or you can use a seperate ternary operation here directly*/}
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
