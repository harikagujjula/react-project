import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InitialReactConcepts from './components/Navigation/InitialReactConcepts/InitialReactConcepts';
import RefsAndPortals from './components/Navigation/RefsAndPortals/RefsAndPortals';
import OnlineShopping from './components/Navigation/OnlineShopping/OnlineShopping';
import PlacePicker from './components/Navigation/PlacePicker/Placepicker';
import ReactQuiz from './components/Navigation/ReactQuiz/ReactQuiz';

const router = createBrowserRouter([
  {path: '/', element: <InitialReactConcepts />},
  {path: '/refs-and-portals', element: <RefsAndPortals />},
  {path: '/online-shopping', element: <OnlineShopping />},
  {path: 'place-picker', element: <PlacePicker />},
  {path: 'react-quiz', element: <ReactQuiz />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
