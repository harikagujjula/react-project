import { useState } from "react";

// Rendering the Entered player name using useState after clicking the button Set Name.
export default function RPPlayer() {
  const [enteredPlayerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleSave() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity' }</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName}/>
        <button onClick={handleSave}>Set Name</button>
      </p>
    </section>
  );
}
