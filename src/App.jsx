import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InitialReactConcepts from "./components/Navigation/InitialReactConcepts/InitialReactConcepts";
import RefsAndPortals from "./components/Navigation/RefsAndPortals/RefsAndPortals";
import OnlineShopping from "./components/Navigation/OnlineShopping/OnlineShopping";
import PlacePicker from "./components/Navigation/PlacePicker/Placepicker";
import ReactQuiz from "./components/Navigation/ReactQuiz/ReactQuiz";
import BehindTheScenes from "./components/Navigation/BehindTheScenes/BehindTheScenes";
import { log } from "./components/BehindTheScenesDemo/log";
import ClassBasedComponents from "./components/Navigation/ClassBasedComponents/ClassBasedComponents";
import SendingHttpRequests from "./components/Navigation/SendingHttpRequests/SendingHttpRequests";
import CustomHooks from "./components/Navigation/CustomHooks/CustomHooks";
import UserForms from "./components/Navigation/UserForms/UserForms";
import UsingFormActions from "./components/Navigation/UsingFormActions/UsingFormActions";
import UsingFormActionsWithHttp from "./components/Navigation/UsingFormActionsWithHttp/UsingFormActionsWithHttpDemo";
import UsingRedux from "./components/Navigation/UsingRedux/UsingRedux";

const router = createBrowserRouter([
  { path: "/", element: <InitialReactConcepts /> },
  { path: "/refs-and-portals", element: <RefsAndPortals /> },
  { path: "/online-shopping", element: <OnlineShopping /> },
  { path: "place-picker", element: <PlacePicker /> },
  { path: "react-quiz", element: <ReactQuiz /> },
  // Extra learning of react concepts.
  { path: "behind-the-scenes", element: <BehindTheScenes /> },
  { path: "/class-based-components", element: <ClassBasedComponents /> },
  { path: "/sending-http-requests", element: <SendingHttpRequests /> },
  { path: "/custom-hooks", element: <CustomHooks /> },
  { path: "/user-forms", element: <UserForms /> },
  { path: "/using-form-actions", element: <UsingFormActions /> },
  {
    path: "/using-form-actions-with-http",
    element: <UsingFormActionsWithHttp />,
  },
  { path: "/using-redux", element: <UsingRedux /> },
]);

function App() {
  log("<App /> rendered");
  return <RouterProvider router={router} />;
}

export default App;
