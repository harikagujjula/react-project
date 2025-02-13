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
  * ***Note:*** We should always return complete object in a Reducer function even though few
    properties are unchanged. This is because Reducer do not automatically merge
    with the previous state. Rather it replaces/overrides the whole Redux state
    object with whatever is returned by an action.
  * ***Note:*** We should never update/mutate the redux state object in the
    Reducer function. Doing this way still works but, would lead to bugs or
    causes debugging tough.
    Example: Somewhere in the reducer function:
    ```
    state.counter++;
    return state;
    ```
    (OR)
    ```
    state.counter++;
    return state.counter;
    ```
    Instead return brand new object by copying nested arrays/objects and
    assigning them with new values.
    ```
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    }
    ```
    Ref: https://academind.com/tutorials/reference-vs-primitive-values

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
      ```
      const counter = useSelector((state) => state.counter);
      ```

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
      ```
      import { useDispatch } from "react-redux";
      const dispatch = useDispatch();
      // Using just Redux and no Redux toolkit.
      dispatch({type: 'increment'});
      (OR)
      // Using Redux toolkit.
      dispatch(counterActions.increment());
      ```

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

## Redux Challenges
  * Potential clash of action type identifiers in case of bigger applications.
  * Copying all the state/store when updating a piece of store when we have more
    properties with state and so the bigger the store/redux file becomes.
  * When we have nested data/complex objects we might accidentally mess up by
    changing the state directly rathern than creating a new object and copying
    the values.
## Solution to Redux Challenges
  * Though we have multiple solutions like:
    Potential clash of action type identifiers => Make use of constants to define
    action types, export and import them.
    Ex:
    export const INCREMENT = 'increment';
    if (action.type === INCREMENT) ......
    Large Redux file => can split into multiple redux files etc.
    However, we don't have to dig into now and have Redux toolkit to address
    these challenges.
  * Developed by Redux team.
  * Extra package that makes using Redux easy.
## How to use Redux toolkit
  * npm install @reduxjs/toolkit
  * import createSlice from @reduxjs/toolkit
  * There is also createReducer() provided by @reduxjs/toolkit, but createSlice()
    is more powerful.
### Creating Slices of state
  * createSlice() used to maintain slices/portion of state and returns the same.
    For example a slice for Counter, a slice for authentication etc.
  * createSlice() accepts following properties(Each slice should have):
      name -> User defined Identifier of the slice.
      initialState -> with all initial values of the state.
      reducers -> Object of all the reducers/methods/actions that are part of or needed by this slice.
      - Each method automatically receive the latest state and action as arguments.
      - The action argument is needed only when we have payload/data to deal with.
      - These methods will automatically be called and do not have to write
        the if checks for action type.
      - *** NOTE *** In these methods in the reducers map, we are allowed to
        mutate the state.
        For example: *** state.counter++ is allowed with Redux toolkit. ***
        Eventhough our code looks like we are trying to mutate the state object,
        we are doing it in an immutable way. How?
        Redux toolkit uses an internal package called *** imgur ***, which will detect
        code like this and automatically clones existing state, creates a
        new state object, keeps all the state which we're not editing and
        override the state which we are editing in an immutable way. i.e it is
        translating the code to immutable way.
        PROS: We do not have to copy the rest of the state properties each time and so can get rid of some code.
  * We could have multiple slices and so have multiple reducers. But there can be
    only one reducer maintained globally and passed to createStore().
  * configureStore() provided by @reduxjs/toolkit also creates store similar to
    createStore() provided by Redux but also makes merging multiple reducers
    (from multiple slices of state) into one single reducer.
    Example: Configure store with single reducer:
    ```
    const store = configureStore({
     reducer: counterSlice.reducer,
    });
    ```
    Configure store with multiple reducers:
    ```
    const store = configureStore({
      reducer: { counter: counterSlice.reducer, auth: authslice.reducer },
    });
    ```
### Dispatching actions
  * createSlice() automatically creates unique action identifiers for our methods in
    different reducers. These methods are called action creators as they will
    create action objects for us where these objects already have a type property
    with unique identifier per action, automatically created behind the scenes.
  * We can just export the actions in the store and import them as needed in the
    component and pass it to dispatch.
    Example:
    ```
    import { authActions } from '../store/counter.js';
    dispatch(authActions.login());
    ```


