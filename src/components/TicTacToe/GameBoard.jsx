export default function GameBoard ({ onSelectSquare, board }) {
  return (
    // Creating Gameboard with 3*3 grid array.
    <ol id="game-board">
      {board.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => 
            <li key={colIndex}>
              {/* Disable button if already clicked once to prevent the change of player. */}
              <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
            </li>
          )}
        </ol>
      </li>)}
    </ol>
  );
}