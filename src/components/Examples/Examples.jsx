import { useState } from "react";
import { EXAMPLES } from "./data.js";
import TabButton from "./TabButton/TabButton";
import Section from "./Section/Section";
import Tabs from "./Tabs/Tabs";

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
    <Section title="Examples" id="examples">
      {/* To define a component props using custom component, use uppercase */}
      {/*       <Tabs ButtonsContainer="menu"> ...... </Tabs> */}

      {/* For identifiers/values, if using built-in element like div, ul, menu 
      we pass it as a string like above, but for custom element like Section etc, we pass it as JSX. */}
      {/*       <Tabs ButtonsContainer={Section}> ...... </Tabs> */}

      {/* To define a component props using built-in component, use lowecase */}
      <Tabs buttons={
        <>
        {/* Forwarding the props onClick of a button, instead using onSelect. */}
        <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
        {/*             OR 
        <TabButton onSelect={function () {handleSelect('components')}}>Components</TabButton> */}
        <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
        <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
        <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
        </>
      }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}