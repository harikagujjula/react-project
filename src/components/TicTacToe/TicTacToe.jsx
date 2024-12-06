import gameLogo from '../../assets/game-logo.png';
import './TicTacToe.css';
import Player from './Player';
import GameBoard from './GameBoard';
import { useState } from 'react';
import Log from './Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './GameOver.jsx';

// To store the current state of the 3*3 in a multi-dimensional array.
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Using a Function to (reuse) derive Active player based on gameTurns state/prevTurns whatever applicable.
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player == 'X')  {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

export default function TicTacToe() {
  // Defining a state to get the Player name on each turn. 
  // Note: We could lift the playerName state from Players component and place 
  // it in TicTacToe. But on each key stroke while updating the player name, 
  // The whole TicTacToe component would be re-evaluated which is not necessary. 
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  // State to manage the Turns for Logs component. But since we already have a 
  // state to manage the button clicks, we can make use only one rather than using multiple states.
  const [gameTurns, setGameTurns] = useState([]);

  // Deriviing active player initially using gameTurns state.
  const activePlayer = deriveActivePlayer(gameTurns);

  // Moved Gameboard to TicTacToe component so that we could also use it to derive Winning of player.

  // Making use of gameTurns state to use with both GameBoard (for managing the gameboard), 
  // Logs(for printing logs about player turns) component. So, Lifting this 
  // state up to the parent of Logs, GameBoard i.e TicTacToe.
  
  // So we are deriving the state from Turns(used for logs as well) and using it here to display the gameboard.
  
  // Deep copying of initial gameboard.
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  // if turns is empty, then for will not execute.
  for (const turn of gameTurns) {
    // Destructuring the object of turns.
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // Deriving if a player has won or not.
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      // Fetching the Player name based on the symbol.
      winner = players[firstSquareSymbol];
    }
  }

  //We would have to show gameover even if there is no winner and the match draws.
  // i.e all the squares are filled and no winner yet.
  const hasDraw = gameTurns.length === 9 && !winner;

  // Since we want the active player all the time, so that we could highlight 
  // the active player and also print X or O in the square selected, i.e we 
  // would need active player in both Gameboard and Player components. 
  // In this case, we can lift the state up to the nearest ancestor component 
  // i.e state value that's needed by both child components(Player, GameBoard) 
  // can be managed in the ancestor component(TicTacToe).
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      // Deriviing active player initially using prevTurns.
      const curPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: curPlayer},
        ...prevTurns,
      ];

        // Now return the updated Turns as a new value to the game turns state.
        return updatedTurns;
    });
  }

  function handleRestart() {
    // We are defining/updating gameturns on each turn. Hence On restart, 
    // Setting the gameturns to empty array and so the rest will be taken care.
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    // Taking the prevPlayers object and on clicking save, only overriding the name 
    // of the player without changing the other.
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <section id ="section__tic-tac-toe">
      <img src={gameLogo} alt="Tic-Tac-Toe hand drawn game board"/>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        {/* Players name edit */}
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName ={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName ={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/* Game borad */}
        {/* Passing the state to GameBoard (to use the active player). */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </section>
  );
}