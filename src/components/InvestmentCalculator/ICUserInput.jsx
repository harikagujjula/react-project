import { useState } from "react";

export default function ICUserInput() {
  // Using a single state to manage all the input changes.
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  // Function to update the input change wih new value and keep the others same as old values.
  function handleUserInputChange(inputIdentifier, newValue) {
    // Since we change only one input value, we are using prevUserInput to keep the other inputs same.
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: newValue
      };
    });
  }

  return (
      <section id="user-input">
        <div className="input-group">
          <p>
            <label>Initial Investment</label>
            <input type="number" required value={userInput.initialInvestment} onChange={(event) => handleUserInputChange("initialInvestment", event.target.value)}/>
          </p>
          <p>
            <label>Annual Investment</label>
            <input type="number" required value={userInput.annualInvestment} onChange={(event) => handleUserInputChange("annualInvestment", event.target.value)}/>
          </p>
          <p>
            <label>Expected Return</label>
            <input type="number" required value={userInput.expectedReturn} onChange={(event) => handleUserInputChange("expectedReturn", event.target.value)}/>
          </p>
          <p>
            <label>Duration</label>
            <input type="number" required value={userInput.duration} onChange={(event) => handleUserInputChange("duration", event.target.value)}/>
          </p>
        </div>
      </section>
  );
}