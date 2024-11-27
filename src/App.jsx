import reactImg from "./assets/react-core-concepts.png";
import { CORE_CONCEPTS } from "./data";

const reactDescriptions = ["Fundamental", "Core", "Crucial"];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

// Making use of Object destructuring for parameter props.
function CoreConcepts ({image, title, description}) {
  return (
    <li>
      <img src={image} alt={title}/>
      <title>{title}</title>
      <description> {description} </description>
    </li>
  );
}

function Header() {
  const randomDescription = reactDescriptions[getRandomInt(2)];

  return (
    <header>
        <img src={ reactImg } alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {/* Using dynamic content render. */}
          { randomDescription } React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
  );
}

function App() {
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
      </main>
    </div>
  );
}

export default App;
