import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InitialReactConcepts from './components/Navigation/InitialReactConcepts/InitialReactConcepts';
import RefsAndPortals from './components/Navigation/RefsAndPortals/RefsAndPortals';
import OnlineShopping from './components/Navigation/OnlineShopping/OnlineShopping';
import PlacePicker from './components/Navigation/PlacePicker/Placepicker';

const router = createBrowserRouter([
  {path: '/', element: <InitialReactConcepts />},
  {path: '/refs-and-portals', element: <RefsAndPortals />},
  {path: '/online-shopping', element: <OnlineShopping />},
  {path: 'place-picker', element: <PlacePicker />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
