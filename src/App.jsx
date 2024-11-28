import { CORE_CONCEPTS } from "./data";
import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts/CoreConcepts.jsx";
import TabButton from "./components/CoreConcepts/TabButton.jsx";
import { useState } from "react";

function App() {
  // Using useState React hook, which manages the state of a specific component.
  // To be called at top level(not inside inner functions).
  // Always Returns data, function to update the state.
  const [ selectedTopic, setSelectedTopic ] = useState("Please select a button");

  function handleSelect(selectedButton) {
    // Calling the update function.
    setSelectedTopic(selectedButton);
    console.log(selectedButton);
  }
  
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {/* Short notation of passing the object keys as parameter. */}
          <CoreConcepts {...CORE_CONCEPTS[0] } />
          <CoreConcepts title={CORE_CONCEPTS[1].title} description={CORE_CONCEPTS[1].description} image={CORE_CONCEPTS[1].image}/>
          <CoreConcepts title={CORE_CONCEPTS[2].title} description={CORE_CONCEPTS[2].description} image={CORE_CONCEPTS[2].image}/>
          <CoreConcepts title={CORE_CONCEPTS[3].title} description={CORE_CONCEPTS[3].description} image={CORE_CONCEPTS[3].image}/>
        </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {/* How do we know which button is clicked. So for that we have to
             send custom arguments to the function to identify the same using arrow functions. */}
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            {/*             OR 
            <TabButton onSelect={function () {handleSelect('components')}}>Components</TabButton> */}
            <TabButton onSelect={() => handleSelect('JSX')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('Props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('State')}>State</TabButton>
          </menu>
        </section>
        <section>
          {selectedTopic}
        </section>
      </main>
    </div>
  );
}

export default App;
