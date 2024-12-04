import gameLogo from '../../assets/game-logo.png';
import './TicTacToe.css';
import Player from './Player';
import GameBoard from './GameBoard';
import { useState } from 'react';
import Log from './Log';

// Using a Function to (reuse) derive Active player based on gameTurns state/prevTurns whatever applicable.
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player == 'X')  {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

export default function TicTacToe() {
  // We can still get this Active player from Turns state and we should not have one more state for just updatig the UI.
  // const [activePlayer, setActivePlayer] = useState('X');

  // State to manage the Turns for Logs component. But since we already have a 
  // state to manage the button clicks, we can make use only one rather than using multiple states.
  const [gameTurns, setGameTurns] = useState([]);

  // Deriviing active player initially using gameTurns state.
  const activePlayer = deriveActivePlayer(gameTurns);

  // Since we want the active player all the time, so that we could highlight 
  // the active player and also print X or O in the square selected, i.e we 
  // would need active player in both Gameboard and Player components. 
  // In this case, we can lift the state up to the nearest ancestor component 
  // i.e state value that's needed by both child components(Player, GameBoard) 
  // can be managed in the ancestor component(TicTacToe).
  function handleSelectSquare(rowIndex, colIndex) {

    // setActivePlayer((currentActivePlayer) => (currentActivePlayer === 'X' ? 'O' : 'X'));

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

  return (
    <section id ="section__tic-tac-toe">
      <img src={gameLogo} alt="Tic-Tac-Toe hand drawn game board"/>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        {/* Players name edit */}
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {/* Game borad */}
        {/* Passing the state to GameBoard (to use the active player). */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </section>
  );
}