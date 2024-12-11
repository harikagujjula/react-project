// Defining the button styled component as a seperate component, to make it reusable.
/* Note that Input and Label together can also be created as a seperate component
 along with their stylings but would need some props. */
import { styled } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: none;
  line-height: inherit;
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border: none;
  & :focus {
    background-color: #f0920e;
  }
`

export default Button;