import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
  // Declaring state for showing Edit or Save button based on click.
  const [ isEditing, setIsEditing ] = useState(false);

  // Declaring another state (at the top) for updating the Player name when changed.
  const [ playerName, setPlayerName ] = useState(initialName);

  function handleEditClick() {
    // The below line is not recommended as React schedules the update of the 
    // state (could be a delay of 1 to 2 milli secs) and does not do it instantly.
    // setIsEditing(!isEditing); 

    // To get the latest state value at any point of time or if your new state 
    // depends on previous state value, we should instead pass it as a function.
    
    // We are trying to pass the oppisite value of current state value as a function.
    setIsEditing(wasEditing => !wasEditing);
  }

  // We will have the event object automatically for the listener/function.
  function handleChange (event) {
    // event.target.value will the input value.
    setPlayerName(event.target.value);
  }

  // If Edit shows up, show the player name else show input with player name.
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    // Here we are listening for the input change and also feeding the 
    // updated value property to the input. This is called 2-way binding. 
    // i.e getting the output with the input and also passing it to the input.
    editablePlayerName = (<input type="text" value={playerName} required onChange={handleChange}/>);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}> {isEditing ? 'Save' : 'Edit'} </button>
    </li>
  );
}