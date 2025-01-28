import { useState } from "react";

export default function UFLoginUsingState() {
  // Can have multiple states for each input or combine together into an object.
  // const [enteredEmail, setEneteredEmail] = useState('');
  // const [enteredPwd, setEneteredPwd] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  function handleSubmit (event) {
    event.preventDefault();
    console.log('Form submitted. Entered values are: ', enteredValues);
  }

  // Change Listener.
  function handleInputIdentifier(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      // Using the identifier to dynamically update the state.
      [identifier]: value
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
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
          onChange={(event) => handleInputIdentifier('password', event.target.value)}
          value={enteredValues.password}
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
