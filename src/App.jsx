import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InitialReactConcepts from './components/Navigation/InitialReactConcepts/InitialReactConcepts';
import RefsAndPortals from './components/Navigation/RefsAndPortals/RefsAndPortals';
import OnlineShopping from './components/Navigation/OnlineShopping/OnlineShopping';
import PlacePicker from './components/Navigation/PlacePicker/Placepicker';
import ReactQuiz from './components/Navigation/ReactQuiz/ReactQuiz';
import BehindTheScenes from './components/Navigation/BehindTheScenes/BehindTheScenes';
import { log } from './components/BehindTheScenesDemo/log';
import ClassBasedComponents from './components/Navigation/ClassBasedComponents/ClassBasedComponents';
import SendingHttpRequests from './components/Navigation/SendingHttpRequests/SendingHttpRequests';
import CustomHooks from './components/Navigation/CustomHooks/CustomHooks';
import UserForms from './components/Navigation/UserForms/UserForms';

const router = createBrowserRouter([
  {path: '/', element: <InitialReactConcepts />},
  {path: '/refs-and-portals', element: <RefsAndPortals />},
  {path: '/online-shopping', element: <OnlineShopping />},
  {path: 'place-picker', element: <PlacePicker />},
  {path: 'react-quiz', element: <ReactQuiz />},
  {path: 'behind-the-scenes', element: <BehindTheScenes />},
  {path: '/class-based-components', element: <ClassBasedComponents />},
  {path: '/sending-http-requests', element: <SendingHttpRequests />},
  {path: '/custom-hooks', element: <CustomHooks />},
  {path: '/user-forms', element: <UserForms />},
]);

function App() {
  log('<App /> rendered');
  return <RouterProvider router={router} />;
}

export default App;
