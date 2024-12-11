import { useState } from 'react';
// Making use of css scoped within the component.
import classes from './AuthInputs.module.css';
// Making use of Styled components package.
import { styled } from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id={classes['auth-inputs']}>
      <div className={classes.controls}>
        <p>
          <Label>Email</Label>
          <input
            type="email"
            className={emailNotValid ? classes.invalid : undefined}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <Label>Password</Label>
          <input
            type="password"
            className={passwordNotValid ? classes.invalid : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes['text-button']}>
          {/*     or can use the classname with camelcase below and in css file.  
          <button type="button" className={classes['textButton']}> */}
          Create a new account
        </button>
        <button className={classes.button} onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}
