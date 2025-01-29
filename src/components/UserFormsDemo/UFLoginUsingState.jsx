/**
 * This file is a component for Login form using State.
 */
import { useState } from "react";
import UFInput from "./UFInput";
import { isEmail, isNotEmpty, hasMinLength} from "./util/validation"

export default function UFLoginUsingState() {
  // Can have multiple states for each input or combine together into an object.
  // const [enteredEmail, setEneteredEmail] = useState('');
  // const [enteredPwd, setEneteredPwd] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  // Defining state to keep track of input fields losing focus.
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  // Form Validation.
  const emailIsInvalid = didEdit.email &&
    !isNotEmpty(enteredValues.email) &&
    !isEmail(enteredValues.email);
  const pwdIsInvalid = didEdit.password &&
    hasMinLength(enteredValues.password, 6);

  function handleSubmit (event) {
    event.preventDefault();
    console.log('Form submitted. Entered values are: ', enteredValues);

    // Resetting the form after submission.
    /* Note that we can also simply reset the form by setting the button type to
       reset. Button type set to submit is for submitting and if its a button,
       then its a simple button where we have to handle any processing for click.
       */
    setEnteredValues({
      email: '',
      password: ''
    });
  }

  // Change Listener.
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      // Using the identifier to dynamically update the state.
      [identifier]: value
    }));

    // Also updating didEdit state, to combine the validation with onBlur with
    // onChange, so that no error message shown when user starts typing after an error.
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <UFInput
          label="Email"
          id="email"
          type="email"
          name="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
          onBlur={() => handleInputBlur('email')}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email.'}
          />

        <UFInput
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) => handleInputChange('password', event.target.value)}
          onBlur={() => handleInputBlur('password')}
          value={enteredValues.password}
          error={pwdIsInvalid && 'Please enter a valid password.'}
          />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/* By default the type for a button is submit. If we add a onClick for
        a button in a form, the form gets submitted. Though the Submit function
        gets triggered, you see the page also refreshes after Form submit, which
        is default form's behavior.

        To prevent that, we can add the submit function to the forms onSubmit
        and use event.preventDefault() which will prevent the default behavior
        of page reload. */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
