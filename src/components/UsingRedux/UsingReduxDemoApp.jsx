import { Provider } from "react-redux";

// Importing store from index.
import store from "../../store/index";
import UsingReduxDemo from "./UsingReduxDemo";

export default function UsingReduxDemoApp() {
  return (
    <>
      {/* Importing Provider and wrapping the URCounter with Provider to provide
    the Counter redux store to URCounter and its child components. Also should
    pass the store as prop.

    Note: USually any application should have only one Redux state/store and
    should be provided/imported/used at top most level of the component(App component).
    Since we are trying to put all learning stuff into one project, we are
    providing the store at just this component level (created an extra component).*/}
      <Provider store={store}>
        <UsingReduxDemo />
      </Provider>
    </>
  );
}
