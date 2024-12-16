import Header from '../../Header/Header.jsx';
import CoreConcepts from "../../CoreConcepts/CoreConcepts.jsx";
import Examples from '../../Examples/Examples.jsx';
import TicTacToe from '../../TicTacToe/TicTacToe.jsx';
import InvestmentCalcultor from '../../InvestmentCalculator/InvestmentCalculator.jsx';
import StylingReactComponents from '../../StylingReactComponents/StylingReactComponents.jsx';

function InitialReactConcepts() {
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
        <TicTacToe />
        <InvestmentCalcultor />
        <StylingReactComponents />
      </main>
    </div>
  );
}

export default InitialReactConcepts;