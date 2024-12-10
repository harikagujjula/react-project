import ICHeader from './ICHeader';
import './InvestmentCalculator.css';
import ICUserInput from './ICUserInput';
import ICResult from './ICResult';
import { useState } from "react";

export default function InvestmentCalculator() {
  // Lifting the state from UserInput component to its parent so that user input
  // changes can also be sent to the Results component and derive the results.
  // Using a single state to manage all the input changes.
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  // Ensuring userInput is valid for duration as duration should be >= 1 and the app does not break.
  // isInputValid will be set to true if duration entered is >= 1. 
  const isInputValid = userInput.duration >=1; 

  // Function to update the input change wih new value and keep the others same as old values.
  function handleUserInputChange(inputIdentifier, newValue) {
    // Since we change only one input value, we are using prevUserInput to keep the other inputs same.
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        // By default in javascript, input's value extracted(event.target.value)
        // will always be a string.  Adding a + before the value forces to convert any string to number.
        [inputIdentifier]: +newValue
      };
    });
  }

  return (
    <div id="ic" class="center">
      <ICHeader />
      {/* Passing handleUserInputChange function as a value for onChangeInput 
      property and userInput. */}
      <ICUserInput onChangeInput={handleUserInputChange} userInput={userInput}/>
      {/* Conditionally rendering the results so that app does not break when entered values did not meet the requirements. */}
      {isInputValid 
        ? <ICResult userInput={userInput}/> 
        : <p>Please ensure duration is greater than 0.</p> 
      }
    </div>
  )
}