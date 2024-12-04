// To store the current state of the 3*3 in a multi-dimensional array.
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard () {
  return (
    <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => <li key={colIndex}><button>{playerSymbol}</button></li>)}
        </ol>
      </li>)}
    </ol>
  );
}