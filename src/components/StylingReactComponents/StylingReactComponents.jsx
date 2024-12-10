import AuthInputs from './AuthInputs.jsx';
import Header from './Header.jsx';
// Note that the Css files can be imported/included and these will be dynamically added to the webpage by vite.
import './styling-react-components.css';

export default function StylingReactComponents() {
  return (
    <div id='styling-react-comps'>
      <Header />
      <main>
        <AuthInputs />
      </main>
    </div>
  );
}
