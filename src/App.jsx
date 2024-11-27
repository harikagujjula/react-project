import { CORE_CONCEPTS } from "./data";
import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts/CoreConcepts.jsx";
import TabButton from "./components/CoreConcepts/TabButton.jsx";

function App() {
  function handleSelect(selectedButton) {
    console.log('hello world!');
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
            {/* // Anything betwen the components is accessed via props children. */}
            <TabButton onSelect={handleSelect}>Components</TabButton>
            <TabButton onSelect={handleSelect}>JSX</TabButton>
            <TabButton onSelect={handleSelect}>Props</TabButton>
            <TabButton onSelect={handleSelect}>State</TabButton>
          </menu>

        </section>
      </main>
    </div>
  );
}

export default App;
