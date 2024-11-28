import { CORE_CONCEPTS } from "./data";
import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts/CoreConcepts.jsx";
import TabButton from "./components/CoreConcepts/TabButton.jsx";
import { useState } from "react";
import { EXAMPLES } from "./data";

function App() {
  // Using useState React hook, which manages the state of a specific component.
  // To be called at top level(not inside inner functions).
  // Always Returns data, function to update the state.
  // with null as default value.
  const [ selectedTopic, setSelectedTopic ] = useState();

  function handleSelect(selectedButton) {
    // Calling the update function.
    setSelectedTopic(selectedButton);
  }

  // Rendering output Using a variable.
  let tabContent = <p>Please select a topic</p>

  if (selectedTopic) {
    tabContent = (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>
          {EXAMPLES[selectedTopic].code}
        </code>
      </pre>
    </div>
    );
  }
  
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {/* Transforming the arrays of objects to jsx code to render the list dyanamically. */}
          {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcepts key={conceptItem.title} {...conceptItem} />
          ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {/* How do we know which button is clicked. So for that we have to
             send custom arguments to the function to identify the same using arrow functions. */}
            <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handleSelect('components')}>Components</TabButton>
            {/*             OR 
            <TabButton onSelect={function () {handleSelect('components')}}>Components</TabButton> */}
            <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
        </section>
        <section>
          {/*  Rendering same content conditionally only if selectedTopic value exists with a variable. */}
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
