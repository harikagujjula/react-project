// Shows Gameover when a winner is found and a button to re-start the game.
export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      { winner && <p>{winner} won!</p> }
      {!winner && <p>Is a draw!</p>}
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}