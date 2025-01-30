/**
 * This file is a component for Login form using State.
 */
import { useUFInput } from '../../hooks/useUFInput.js';
import UFInput from './UFInput';
import { isEmail, isNotEmpty, hasMinLength} from './util/validation.js';

export default function UFLoginUsingState() {
  // Using custom hook to handle input fields with default value, validate functions as arguments.
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useUFInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useUFInput('', (value) => isNotEmpty(value) && hasMinLength(value, 6));

  function handleSubmit (event) {
    event.preventDefault();
    console.log('Form submitted. Entered values are:', emailValue, passwordValue);

    if (emailHasError || passwordHasError) {
      return;
    }
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
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={emailValue}
          error={emailHasError && 'Please enter a valid email.'}
          />
         <UFInput
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password.'}
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
