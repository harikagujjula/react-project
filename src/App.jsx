import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts/CoreConcepts.jsx";
import Examples from './components/Examples/Examples.jsx';
import TicTacToe from './components/TicTacToe/TicTacToe.jsx';
import InvestmentCalcultor from './components/InvestmentCalculator/InvestmentCalculator.jsx';

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
        <TicTacToe />
        <InvestmentCalcultor />
      </main>
    </div>
  );
}

export default App;
