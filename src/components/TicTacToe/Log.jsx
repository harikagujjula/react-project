// Outputs ordered list about different turns taken by the players 
// i.e an array that gets new value each time a button is clicked. 
// So, we again have to lift the state up as we will not have which button is 
// clicked in this component and is avaialable in Gameboard comp.
export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>
      )}
    </ol>
  );
}