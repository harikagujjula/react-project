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
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
        </section>
        <section>
            {/* Rendering content conditionally only if selectedTopic value exists with ternary operator. */}
            {selectedTopic ? (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>
                  {EXAMPLES[selectedTopic].code}
                </code>
              </pre>
            </div>
          ) : "Please select a button" }

          {/* Rendering same content conditionally only if selectedTopic value exists with && */}
          {!selectedTopic && <p>Please select a topic.</p>}

          {selectedTopic && (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>
                  {EXAMPLES[selectedTopic].code}
                </code>
              </pre>
            </div>
          )}

          {/*  Rendering same content conditionally only if selectedTopic value exists with a variable. */}
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
