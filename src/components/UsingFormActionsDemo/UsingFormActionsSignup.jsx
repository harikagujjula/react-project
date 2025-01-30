/**
 * USing Form actions with Signup form.
 */

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "./util/validation";
// useActionState hook vailable only with React ^19.
import { useActionState } from "react";

/* Form action that has prevFormState and formData object as arguments provided
  by React.

  Note: This action can be defined outside the component function like below or
  outsourced completely in a different file, if we do not have state or props being used.
*/
function signupAction(prevFormState, formData) {
  // Extract values.
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const fname = formData.get("firstname");
  const lname = formData.get("lastname");
  const role = formData.get("role");
  const terms = formData.get("terms");
  // Use getAll for a fieldgroup like checkboxes with same name for all inputs.
  const acquisitionChannel = formData.getAll("acquisition");

  // Validation using validation.js
  let errors = [];
  if (!isEmail(email)) {
    errors.push("Invalid email address.");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("Your password must have a minimum of six characters.");
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push("Passowrds do not match.");
  }

  if (!isNotEmpty(fname) || !isNotEmpty(lname)) {
    errors.push("Please enter both your firstname and lastname.");
  }

  if (!isNotEmpty(role)) {
    errors.push("Please select role.");
  }

  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }

  if (acquisitionChannel.length === 0) {
    errors.push("Please select atleast one acquisition.");
  }

  // Invalid inputs provided.
  if (errors.length > 0) {
    /* When a form is submitted using formActions with invalid data, React
       resets the form which means clears the input values entered if any.
       So, while returning, we have to also return the current values to
       re-populate the form along with errors if any.

       Also note that we have to use defaultValue prop instead of value prop for
       input fields to populate the values entered while using form actions .

       Also note that, since the defaultValues are being set on form submit, the
        reset button does not automatically empty the input fields rather set to
        previous values(in case of invalid input). However, on Valid input, the
        form values will be noticed cleared as we are not returning any entered
        values and retuning just the errors: null. So, if we need the reset
        button to clear the input values entered, we may have to handle manually. */
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPassword,
        fname,
        lname,
        role,
        terms,
        acquisitionChannel,
      },
    };
  }

  return { errors: null };
}

export default function UsingFormActionsSignup() {
  /* Hook available only with React ^19.
     Called after action function and manages form state values.
     First argument - the action function (signupAction)
     Second argument - an initial state so that we can capture when the form is
     not submitted yet.
     Returns an array
      - formState - The formstate after submitting the form.
      - formAction - We pass our action to useActionState and React
        creates a new updated function by kind off wraping it with our action
        and This should be passed to the form action prop.
        <form action={signupAction}> => <form action={formAction}>
      - pending - true or false whether the form is currently being submitted or
        not. Usually used for async actions.
   */
  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        {/* Note: We have to use defaultValue prop instead of value prop for
       input fields while using form actions to populate the values entered and
       also ensure we set only exists. */}
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPasswordpassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.fname}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.lname}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          // Note: Though defaultValue is set, this might get reset back to first
          //  value. And this seems to be a bug with React.
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          {/* For checkboxes, we shoudl use defaultChecked prop with includes(). */}
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          {/* For checkboxes, we shoudl use defaultChecked prop with includes(). */}
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {/* Rendering Error messages if any. */}
      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
