import { useRef, useState } from "react";

// Rendering the Entered player name using useState after clicking the button Set Name.
/* To just track the entered player name in the textbox and also use the same 
value with the h2 tag but on button click, we would need 2 states one for the 
textchange and the other for tracking button click. In such cases, we can rather
use React Refs (provided by React hook similar to useState). 

These ref can access any properties and methods of the html element. Example the
input ref can access all the properties of the html element input.*/
export default function RPPlayer() {
  // Using a ref to store the player name.
  const playerName = useRef();
  const [enteredPlayerName, setPlayerName] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // No need of handleChange anymore as we are using ref for tracking player name change.
  // function handleChange(event) {
  //   setPlayerName(event.target.value);
  // }

  function handleSave() {
    // setSubmitted(true);
    // ref will always and only have a current object available.
    setPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      {/* <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity' }</h2> */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity' }</h2>
      <p>
        {/* No need of handleChange, value anymore as we are using ref for 
        tracking player name change. ref is also a react prop available for all 
        react components similar to kep prop. */}
        {/* <input type="text" onChange={handleChange} value={enteredPlayerName}/> */}
        <input type="text" ref={playerName}/>
        <button onClick={handleSave}>Set Name</button>
      </p>
    </section>
  );
}
