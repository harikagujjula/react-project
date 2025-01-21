# Class-based components
* This is Traditional way of creating components in React before 16.8 version and not recommended anymore.
* Functional and Class-based components can work together in a combination. This
  might be noticed if you are working on older projects or where you are trying
  to migrate to latest react versions. But if you are starting a fresh, you
  should stick to one.
* Prior to 16.8 there is only one way to manage state and lifecycle methods
  which is by using Class-based components.
* Class is not a React component, it is a JavaScript class.
* Class component can have any number of user defined methods, but should have a
  render method which is equivalent to return statement in functional components.
* Render method do not accept props as argument, instead it is accessed using
  this.props when we extend Component class.
* With Class-based components, state is always an object. But with Functional
  components it could be anything a boolean, string, object, array.
* All the state should be grouped and set to state property (this.state).
* To update any value in state, this.setState is used which also accepts an
  object and so merges with the previous state object.
* Class-based can't use Hooks.
* For Side effects in Functional components, we have useEffect(). And with
  Class-based components, we have life cycle methods to run code at different points.
  - componentDidMount() - When component is just mounted.
      -> This is equivalent to useEffect(..., []) with empty dependency array.
  - componentDidUpdate() - When component is updated.
      -> This is equivalent to useEffect(..., [someVal]) with some dependencies
      array.
  - componentWillUnmount() - Right before component is unmounted from DOM.
      -> This is equivalent to cleanup function of useEffect.
      useEffect(() => {
        ....

        return () => {
          ...
        }
      }, [])
## Which Component Type to use?
  * You should prefer Functional components(strong recommendation).
  * Use Class-based if:
    - You prefer them
    - You're working on existing project where they are being used.
    - You're building an Error Boundary
## Error Boundary
  - Not a bug that we introduced.
  - Errors that cannot be prevent or something went wrong like Http request that did not complete.
  - Equivalent to try/catch with Regular javascript statements.
  - But since this is jsx code, and we cannot use try/catch, any component can
    implement componentDidCatch() lifecycle method to deal with Error boundaries.
  - How to handle?
    - Create a class component that implements componentDidCatch().
    - Wrap the component with ErrorBoundary class component.
    - When any of the child components throws an error, componentDidCatch() of
    that component will be triggered.
  - *** Note: *** There is no equivalent for this with Functional components. So if you
    want to handle error boundaries, you should use Class-based components.

