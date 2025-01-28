/**
 * This file is a component for Login form using State.
 */
import { useState } from "react";

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
  const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');
  const pwdIsInvalid = didEdit.password && enteredValues.password.length < 4;

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
  function handleInputIdentifier(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      // Using the identifier to dynamically update the state.
      [identifier]: value
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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"
          // Adding onchange prop and value to the input field.
          onChange={(event) => handleInputIdentifier('email', event.target.value)}
          value={enteredValues.email}/>
          {/* Validating input on every key stroke. */}
          {emailIsInvalid &&
            <div className="control-error">Please enter valid email address.</div>
          }
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
          onChange={(event) => handleInputIdentifier('password', event.target.value)}
          value={enteredValues.password}
          // Validating input on loosing focus.
          onBlur={() => handleInputBlur('password')}
          />
          {pwdIsInvalid &&
            <div className="control-error">
              Please enter password with minimum length of 5.
            </div>
          }
        </div>
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
