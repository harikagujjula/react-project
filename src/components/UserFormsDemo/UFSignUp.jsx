/**
 * Signup form demonstrating use of Form actions.
 */

import { useState } from 'react';

export default function Signup() {
  // State to manage validation error related to confirm password.
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  function handleSubmit (event) {
    event.preventDefault();
    console.log('Form submitted');

    /* Getting the form data using the Built-in FormData object provided by the
    browser. This Form object gets hold of all the values entered into a form.
    This takes the form as input by passing event.target.

    * Note: All the inputs(select text etc) must have the name prop to work with
    * FormData object, so that they can be extracted using get().
      Ex:     const enteredEmail = formData.get('email');
    */
    const formData = new FormData(event.target);
    /* There is a trick to get all the values from the form as an object using
      built in Class Object provided by Browser.
      formData.entries() returns an array of form values and
      Object.fromEntries() static method converts it to an object key-value pair.

      * But We will not be able to fetch the multivalue fields like checkboxes,
      * radio buttons etc using the above method, as they have same name.
      * We should manually handle them using formData.getAll().
    */
    const acquisitionChannel = formData.getAll('acquisition');
    const data = Object.fromEntries(formData.entries());
    data.acquisition = acquisitionChannel;
    console.log('Form data: ', data);

    // Validating the password and confirm password.
    if ( data.password !== data['confirm-password']) {
      setPasswordsAreNotEqual(true);
      // No other processing if validation fails.
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        {/* required attribute not only validates for empty input, but also
        validates for valid inputs like an email should be a proper email address. */}
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength={6} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          {passwordsAreNotEqual &&
            <div className='control-error'>Passwords must match. </div>
          }
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        {/* Note that all the checkboxes of this field will have same name prop.*/}
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
