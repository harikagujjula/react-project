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
* # Using memo - One way of preventing unnecessary renders.
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
