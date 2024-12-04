// To store the current state of the 3*3 in a multi-dimensional array.
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard ({ onSelectSquare, turns }) {
  // Making use of gameTurns state to use with both GameBoard (for managing the gameboard), 
  // Logs(for printing logs about player turns) component. So, Lifting this 
  // state up to the parent of Logs, GameBoard i.e TicTacToe.
  
  // So we are deriving the state from Turns(used for logs as well) and using it here to display the gameboard.
  
  let gameBoard = initialGameBoard;
  // if turns is empty, then for will not execute.
  for (const turn of turns) {
    // Destructuring the object of turns.
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    // Creating Gameboard with 3*3 grid array.
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => 
            <li key={colIndex}>
              <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
            </li>
          )}
        </ol>
      </li>)}
    </ol>
  );
}