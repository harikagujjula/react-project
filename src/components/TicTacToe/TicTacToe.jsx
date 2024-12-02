import gameLogo from '../../assets/game-logo.png';
import './TicTacToe.css';

export default function TicTacToe() {
  return (
    <section id ="section__tic-tac-toe">
      <img src={gameLogo} alt="Tic-Tac-Toe hand drawn game board"/>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        {/* Players name edit */}
        <ol id="players">
          <Player name="Player 1"symbol="X"/>
          <Player name="Player 2"symbol="O"/>
        </ol>
        {/* Game borad */}
        Game board
      </div>
      LOG
    </section>
  );
}