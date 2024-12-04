// To store the current state of the 3*3 in a multi-dimensional array.
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard ({ onSelectSquare }) {
  // Making use of gameTurns state to use with both GameBoard (for managing the gameboard), 
  // Logs(for printing logs about player turns) component. So, Lifting this 
  // state up to the parent of Logs, GameBoard i.e TicTacToe.
  /*
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // Function to trigger on selecting square with row, col index and the player symbol.
  function handleSelectSquare (rowIndex, colIndex) {
    // prevGameboard state is automatocally made available by React.
    setGameBoard((prevGameBoard) => {
      // While updating javascript objects or arrays, we should not update / 
      // mutate them directly. Rather we should update them via immutable way 
      // i.e make a copy of it and update the new one.
      // Copying all array with all inner values.
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    // Executing the custom function to capture the state that is defined in TicTacToe to determine activeplayer.
    onSelectSquare();
  } 
  */

  return (
    // Creating Gameboard with 3*3 grid array.
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => 
            <li key={colIndex}>
              <button onClick={onSelectSquare}>{playerSymbol}</button>
            </li>
          )}
        </ol>
      </li>)}
    </ol>
  );
}