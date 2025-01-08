# Place Picker Demo with concepts of Side Effects

* ## What are side effects?
  * Tasks that do not impact the *current component render cycle.
  * For example: In our applcation, We are Sorting the places by user's
  location(PlacePickerDemo.jsx). The code that fetches the users location does
  not have direct impact on component cycle.
  * Side effects should be wrapped by useEffect() hook.
* ## useEffect()
  * useEffect() hook ensures, code inside it will be executed only after
  the component's (where it is used) execution is completed for once.
  * Without useEffect() hook in PlacePickerDemo component, it will end up in infinite loop.
  * useEffect() hook accepts 2 arguments.
    1. Function/code that causes side effect.
    2. Array of dependencies.
      - state or prop that is used inside the useEffect hook().
      - If there are no dependencies, we should define it as empty array to avoid
      infinite loop.
      - code inside useEffect() will be re-executed whenever there is a change in
      the dependencies. Else will be executed only once.
  * When is useEffect() needed or not needed?
    - Only needed to prevent infinite loops or you have code that should run only
     after the current component execution is done atleast once.
    - Not all side effects require usage of useEffect(). It is not a good practice to
  always use useEffect() as this adds an extra execution cycle after the
  component execution.
