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

## Working with Redux
  * npm install redux, react-redux if not included in the project already.
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


