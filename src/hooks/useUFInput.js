/**
 * useInput custom hook to handle input fields in a more generic way.
 * Name should start with "use" as it is a custom hook, so that rules of hooks are applied.
 */

import { useState } from "react";

export function useUFInput (defaultValue, validateFn) {
  // State to keep track of the input field.
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  console.log("defaultValue:", defaultValue);

  // Defining state to keep track of input fields losing focus.
  const [didEdit, setDidEdit] = useState(false);

  // Adding Validation to input field by using the validate function passed.
  const valueIsValid = validateFn(enteredValue);

  // Change Listener.
  function handleInputChange(event) {
    setEnteredValue(event.target.value);

    // Also updating didEdit state, to combine the validation with onBlur with
    // onChange, so that no error message shown when user starts typing after an error.
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    inputValue: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
