# Behind the scenes

* Using React Dev Tools chrome extension > Profiler to analyze
  - The component tree rendering.
  - What components are re-rendered on performing a task.
  - Time taken for a component to render.
* A change to a component will re-render all its child components again and do
  not re-render its parent components.
* A change to a component can occur when the component's internal state changes
  i.e when the state of that component changes.
* There can be cases like lets say the BehindTheScenesDemo comp is re-executed
  when user tries to type into counter input, even without clicking on Set. This
  also causes Header and Counter components to re-execute, resulting in all the
  other child components to be re-executed as well.
  - To prevent this un-necessary re-execution of components, we can use memo.
* # Using memo - One way of preventing unnecessary component exections.
  - Wrap a component that is at a high level using memo. In our case the best
    component to use memo is Counter as BehindTheScenesDemo has an internal
    state change.
  - A component wrapped with memo will compare the old and new props passed to it
    and will re-execute the component only when the props values are changed.
  - Not all the components should be wrapped with memo as this would just add
    unnecessary checks for props comparision.
  - Use it as high up in the component tree as possible, as blocking a component
    execution there will also block all child component executions.
  - Don't use it on components where props will change frequently, which costs
    performance.
* # Using better way of component composition - Another way of preventing unnecessary component exections.
  - If possible, Move the code in a component that could be seperated and is
    causing whole code to re-execute to a seperate component(ConfigureCounter.jsx).
* # Using useCallback in conjuction with memo.
  - Use Case: Use when you want to memoize a callback function so that it doesn’t get
    recreated on every render.
  - Sometimes, the functions could be passed as props and as we learnt functions
    in javascript are objects and so are treated new everytime eventhough the code
    inside is same.
  - Hence any component which has functions passed as props as values, could
    still be seen re-executed even though we wrap the component with memo.
  - To prevent this, wrap such functions with useCallback() hook.
  - React stores the function wrapped with useCallback() and returns the same
    instance of it unless one of the dependencies changes.
* # Using useMemo() hook - to prevent re-computation of inner functions.
  - Use Case: Use when you want to memoize the result of a computation so that
    it doesn’t get re-calculated on every render unless dependencies change.
  - To be used with inner functions inside component function.
  - Wrap the function call with useMemo as first argument and their dependencies
    as second argument.
  - React stores the result of the computation and skips recomputation unless
    the dependencies change.
  - Useful for optimizing expensive calculations.
  - Note: memo a High-Ordered Component(HOC) to be used with Component functions
    and useMemo() a react hook, to be used with computations inside a component.
* State in a component is scoped to that component. So when a component is
  re-created/re-executed, the state will also get re-created. So, multiple
  instances of the component has its own isolated state.
* React tracks state by component type & position (of that component) in the tree.
  That is the reason, we have to add a key parameter (with a unique index value)
  to the component while rendering the component, so that the state is
  attached to a specific component instance. We can also use keys for resetting the components.



