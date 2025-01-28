// Form submission using Refs.

import { useRef } from "react";

export default function UFLoginUsingState() {
  // Defining Refs for input fields.
  const email = useRef();
  const password = useRef();

  function handleSubmit (event) {
    event.preventDefault();

    // Getting the current value of the Refs.
    const enteredEmail = email.current.value;
    const enteredPwd = password.current.value;
    console.log('Form submitted. Entered values are: ', enteredEmail, enteredPwd);

    // Resetting the form after submission.
    /* As we are using Refs, we can directly reset the values of the input
      fields, by setting them to empty string. But this is not the best way to
      update the DOM in React and is not recommended as React should be
      responsible for updating DOM  values and we should not manually do it.

      email.current.value = '';

      Instead we can use the same method that can be used with FormData object
      using event.target.reset() which is same as setting the button type to
      reset.
     */
      event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"
          // Attaching the ref to the input field.
          ref={email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
          // Attaching the ref to the input field.
          ref={password}
          />
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
