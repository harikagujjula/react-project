import ICHeader from './ICHeader';
import './InvestmentCalculator.css';
import ICUserInput from './ICUserInput';
import ICResult from './ICResult';

export default function InvestmentCalculator() {
  return (
    <div id="ic" class="center">
      <ICHeader />
      <ICUserInput />
      <ICResult />
    </div>
  )
}