
import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const reactDescriptions = ["Fundamental", "Core", "Crucial"];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
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