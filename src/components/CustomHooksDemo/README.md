# Custom Hooks
* Custom hooks will also be functions that can be called from different places
  but are guaranteed to be used in valid places.

## Why we build/need?
* React hooks can only be called inside component functions or other hook
  functions(i.e custom hooks).
* React hooks must not be called in nested code statements (like if statements),
  but should only be called on top level.
* Usecase: Like we reuse components like Modal, We might have situations where we can
  use a generic logic for code that does not return jsx code(code that has
  state update logic, react hooks).
  We cannot put that code into a seperate component as it is part of component
  contributing to state change. Also, We cannot also define such code as a
  function and outsource it, as it contains React hooks(useEffect as in this
  example) and React hooks cannot be used outside component function. So this
  code can be wrapped into a custom hook so that it can be re-used.

## How to build?
* To maintain a structural way, maintained in a folder called hooks here
  (Not a rule, but for Readability).
* Create a file/function for the hook. The function name/custom hook function
  should start with "use" and so the file name, as in React the functions that
  start with "use" are called hooks. And React projects enforce certain rules
  on such functions. (Like React hooks cannot be used in nested code.)
* Custom hooks should also manage all the related states. Note defining the
  states in component functions rather than in custom hooks would reduce the
  re-usability of the custom hook. Note that even here, if the state in custom
  hooks is updated, that also re-executes the component that this hook being
  used in. Behavior of the component remains same.
*
