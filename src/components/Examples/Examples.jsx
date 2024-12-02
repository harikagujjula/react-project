import { useState } from "react";
import { EXAMPLES } from "./../../data";
import TabButton from "../TabButton/TabButton";
import Section from "../Section/Section";

export default function Examples() {
  // Using useState React hook, which manages the state of a specific component.
  // To be called at top level(not inside inner functions).
  // Always Returns data, function to update the state.
  
  // Moving the usestate from App() to Examples component, and now the whole 
  // App component(including Header and others) will be re-rendered each time 
  // button is clicked. Rather only the Examples component will be re-rendered.
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
    <>
    <Section title="Examples" id="examples">
      <menu>
        {/* Forwarding the props onClick of a button, instead using onSelect. */}
        <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
        {/*             OR 
        <TabButton onSelect={function () {handleSelect('components')}}>Components</TabButton> */}
        <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
        <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
        <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
      </menu>
    </Section>
    <section>
      {/*  Rendering same content conditionally only if selectedTopic value exists with a variable. */}
      {tabContent}
    </section>
    </>
  );
}