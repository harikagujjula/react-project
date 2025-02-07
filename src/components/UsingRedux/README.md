# REDUX

## What is Redux?
  * A state management system(Flux like state) for Cross-component state or
    App-wide state.
    * Local state:
      - State that belongs to a single component.
      - Should be managed inside the component via useState() / useReducer().
      - Ex: Listening to user input, or toggling a show more details button.
    * Cross-component state:
      - State affecting multiple components
      - Ex: A modal shared by multiple components.
      - This required props drilling.
    * App-wide state:
      - State affecting whole application.
      - Ex: Menu/Navigation links that change after login.
      - This requires Props drilling.

## Why Redux?
  * Can be considered as an alternative for Context API that is provided by React
    or Can also be used in conjuction with Context API, as required.
    Example: We can use Redux for managing app-wide state and Context API for
    selected cross-component state.
  * React Context has some potential disdvantages (i.e they might or might not
    matter. If the disadvantages do not matter, then we do not need Redux and
    can stick with React context.)
    * In more complex apps, using React context can lead to deeply nested
      context provider components(May not be for many applications). To overcome
      this, we could maintain one context provider though, but that would become hefty.
    * React Context is not optmized for high-frequency state changes.

## How Redux works?
  * Maintains only one central data(state) store. You never have more.
    Ex: Authentication state, theme change state, etc all should have one store.
  * The store data maintained by Redux can have multiple properties dependent /
    independent of each other.
  * Components subsribes to the store, so that whenever there is a change in the
    state, the components receive a part of redux to indicate the components
    re-execution(should re-render the UI).
  * Components cannot directly manipulate the data in the store.
  * Only Reducer Functions mutates(change) the store data.
    Note: Reducer functions are a general concept. Reducer function means a
    function that takes an input, reduce it and spit an output. These are not
    useReducer() hook.
  * How are Reducers connected to components? As it is at the end it will be the
    components that should trigger the data change (EX: Click on a button of
    the component).
    It is through Actions. Components dispatch Actions that are forwarded to Reducer.
    And Reducer performs Actions and updates State in the central store. Components
    subscribed to the store gets updated with latest data.

                      -----------------> Reducer Function
                    |  Forwarded to         |
                    |                       |
                    |                       |
                    |                       V
                  Actions             Central Data(state) Store
                    ^                       |
                    |                       |
                    |                       |
                    |   Dispatch            V
                     ----------------- Components
  * Actions can also attach payloads(extra data) to be sent to the Reducer function,
    to make it more flexible.
  * We should always return complete object in a Reducer function even though few
    properties are unchanged. This is because Reducer do not automatically merge
    with the previous state. Rather it replaces the whole Redux state object
    with whatever is returned by an action.
## Working with Redux
  * npm install redux, react-redux if not included in the project already.

### Using data from the store(Functional components)
  * Now that we have the redux store created, how to connect that with React app?
  * Export the store. Since there will be only one Redux store per application,
    use:
    export default <store_name>.
  * Note: We provide the exported store to the react application.
    This should be provided at the top most level of component tree (App component),
    so that all the components and its children can subscribe to the store and
    receive any updated changes.
  * Import Provider from react-redux.
    ```
    import { Provider } from "react-redux";
    ```
  * Wrap the component with Provider (Similar to Context).
    <Provider><App></Provider>
  * Import store and pass the store as param to the provider.
    ```
    import store from "<location of the store>";
    ```
    <Provider store={store}><App></Provider>
  * To show the value provided by the store, in the component (URCounter here):
    - Import useSelector() hook from react-redux.
      ```
      import { useSelector } from "react-redux";
      ```
      This is used to fetch selected part of the store. When a component uses
      this hook, react-redux will setup automatically a subscription to the
      Redux store for that component. So our component will be updated and will
      receive the latest state from Redux each time the store is updated.
      If a component(using useSelector()) is unmounted from DOM, react-redux
      will automatically unsubscribe to the Store.

      There is also useStore() hook provided by react-redux that gives access to
      the whole store.

### Updating data in the store.(Functional components)
  * As we learnt, we do not manually update the data in the store, rather
    components dispatch actions that are forwarded to the reducer to update the data.
  * How to dispatch actions?
    - React-redux provides useDispatch() hook which returns a function that can
      dispatch actions to the store(Reducer is in the store).
    - Create the handler functions for any buttons/elements as required and
      dispatch the action type. The action type should match with those in the store.

### Using data from the store and updating data in the store using connect()(Class based components)
  * connect() is provided by react-redux.
  * Since Class based components do not allow hooks, connect() can be used as an
    equivalent of useSelector(), useDipatch() hooks in Functional components.
    Refer to *** URCounterClassBased *** component.
  * connect() allows a component to subscribe to the store, get data from the
    store and update data in the store.
  * Receives 2 arguments as just pointers(and will be executed by React-redux):
    - a function that maps redux state to props, which can then be used in this
      component(mapStateToProps).
    - a function that returns functions as props to the receiving component
      (URCounterClassBased), which when executed will dispatch the
      actions to the redux store(mapDispatchToProps).
  * Returns a function as a value and that function will be executed again with
    the component as an argument.
  * So, When using connect, we should export the component as below:
    ```
    export default connect(mapStateToProps,mapDispatchToProps)(<component>);
    ```


