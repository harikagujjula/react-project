import gameLogo from '../../assets/game-logo.png';
import './TicTacToe.css';
import Player from './Player';
import GameBoard from './GameBoard';
import { useState } from 'react';
import Log from './Log';

export default function TicTacToe() {
  const [activePlayer, setActivePlayer] = useState('X');

  // State to manage the Turns for Logs component. But since we already have a 
  // state to manage the button clicks, we can make use only one rather than using multiple states.
  const [gameTurns, setGameTurns] = useState();

  // Since we want the active player all the time, so that we could highlight 
  // the active player and also print X or O in the square selected, i.e we 
  // would need active player in both Gameboard and Player components. 
  // In this case, we can lift the state up to the nearest ancestor component 
  // i.e state value that's needed by both child components(Player, GameBoard) 
  // can be managed in the ancestor component(TicTacToe).
  function handleSelectSquare(rowIndex, colIndex) {

    setActivePlayer((currentActivePlayer) => currentActivePlayer==='X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      // Here we cannot use activePlayer as that is from different state. 
      // Rather we could instead make use of another variable that is 
      // derived from Turns state.
      let curPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player ==='X') {
        curPlayer = 'O';
      }
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex, player: curPlayer}},
        ...prevTurns];

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
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      <Log/>
    </section>
  );
}