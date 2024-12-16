import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InitialReactConcepts from './components/Navigation/InitialReactConcepts/InitialReactConcepts';
import RefsAndPortals from './components/Navigation/RefsAndPortals/RefsAndPortals';

const router = createBrowserRouter([
  {path: '/', element: <InitialReactConcepts />},
  {path: '/refs-and-portals', element: <RefsAndPortals />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
