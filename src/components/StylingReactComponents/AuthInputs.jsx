import { useState } from 'react';
// Making use of css scoped within the component.
import classes from './AuthInputs.module.css';
// Making use of Styled components package.
import { styled } from 'styled-components';
import Button from './SRCButton';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => $invalid ? '#f87171' : '#6b7280'};
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) => $invalid ? '#fed2d2' : '#d1d5db'};
  color: ${(props) => props.$invalid ? '#ef4444' : '#374151'};
  border: 1px solid ${(props) => props.$invalid ? '#f73f3f' : 'transparent'};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
          {/* Updating the styled component to render dynamic classes based on conditions */}
          {/* Sending emailNotValid value to invalid prop. */}
          {/* You might see a warning for invalid prop and that is because its a
          built-in prop for a label element. So to prevent clash with  built-in 
          props, prepend the prop with a "$". This is allowed in javascript. */}
          <Label $invalid={emailNotValid}>Email</Label>
          {/* Making use of conditionally adding classes with styled-comp as below.
          <Input
            type="email"
            className={emailNotValid ? classes.invalid : undefined}
            onChange={(event) => handleInputChange('email', event.target.value)}
          /> */}
          <Input
            type="email"
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <Label $invalid={emailNotValid}>Password</Label>
          {/* Making use of conditionally adding classes with styled-comp as below.
          <Input
            type="password"
            className={passwordNotValid ? classes.invalid : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          /> */}
          <Input
            type="password"
            $invalid={emailNotValid}
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
        {/* <button className={classes.button} onClick={handleLogin}>Sign In</button> */}
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
