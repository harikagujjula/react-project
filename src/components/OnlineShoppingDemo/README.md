# Online shopping application

* This setup is similar to Project management where a state is being shared 
  across components and props being forwarded through other components. 
  Ex: Props being forwarded from OnlineShoppingDemo > Shop > Product and 
  similarly OnlineShoppingDemo > OSHeader > CartModal > Cart.

## Concepts
* Props drilling
  * Passing the props through multiple components
  * For example, To handle Add task, delete tasks, we are passing the 
    handleAddTask, handleDeleteTask all the way from App > SelectedProject > Tasks > NewTask.
  * Disadvantages:
    * Problem of shared state
    * Components might become less reusable
    * Unnecessary code to pass props all through multiple layers
* One Possible Solution - Component Composition
  * Instead of passing props, wrap the component inside other component and just
    render it using children.
  * For example: The map function to render products in Shop.jsx can be copied 
    and added inside wrapper of Shop in OnlineShoppingDemo.jsx. This way no need 
    of sending props to Product component through Shop component.
  * Disadvantages:
    * One file can become too big if we try to move every such case into one 
    file. And all other files might just act as wrappers.
* Another Solution - React Context API
  * A feature that makes sharing data across components & component layers a breeze.
  * Used to share values and state updating function with multiple components 
    without using props drilling. 
  * Allows to create a context value and wrap around all the components.
  * Context value can be connected to the state and so can get rid of all those 
    props, state updating functions etc.
  * Context values that are stored in a file usually will be noticed under store
    folder in src as its a data/state store. (Not a technical requirement but 
    just a conventional practice)
  * Steps to create a Context:
    1. Create a file with a descriptive name in store folder.
    2. Create a context using React's createContext using PascalCase and export it.
    3. Context can be created with a default value.
    4. Provide/import the context in the file where all the components in it 
    would need that context.
    Example: In OnlineShoppingDemo, component inside OSHeader (Cart) needs this 
    context and Product needs this context created.
    5. Wrap the components with the context created(as a component), so that all
     the components inside or nested components can access this context.
    <DummyContext> ......with all components inside.... </DummyContext>
    6. Using a context as a component is supported for React >= 19.
    7. For React < 19, use Provider property instead.
    <DummyContext.Provider> ......with all components inside.... </DummyContext.Provider>
    8. Note: While using the wrapper, ensure value is passed as props. The 
    default value set when creating context is only used if a component that was
    not wrapped by <DummyContext> tries to access the context value. 
    9. Consume the context and provide the value using useContext() method 
    provided by usecontext hook that accepts context as argument.
      ```
      const ctx = useContext(DummyContext);
      ```
    10. We can also consume the context using use hook provided by react.
      ```
      const ctx = use(DummyContext);
      ```
      * use() hook is only supported with React >= 19.
      * As we know, normally we are not allowed to use React hooks inside if or 
      for loops. But use() hook allows us to even inside loops making it more 
      flexible than useContext().
    11. Link Context to the State.


