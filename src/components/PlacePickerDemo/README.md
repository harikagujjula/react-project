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
  * Also provides cleanup function
    - By returning the function from inside the useEffect().
    - Clean up function will be triggered right before the next execution of
      useEffect() hook or when the component is dismounted/removed from the DOM.
* ## useCallback()
  * Hook provided by React that should be used when a function is passed as
  dependency to the useEffect().
  * In javascript, functions are objects. Two functions with same code inside
  are never equal. So, when a function is passed as dependency to useEffect(),
  the useEffect() executes everytime as it assumes dependencies changed
  eventhough its the same function with no change.
  * useCallback() ensures the wrapped function is not re-created, rather stores
  the function internally and re-use it each time the component is re-executed.
  * Accepts 2 arguments.
    1. The function (thats passed as dependency to the useEffect())
    2. Array of dependencies (state or prop that are needed by the function
    wrapped by useCallback()).
  
