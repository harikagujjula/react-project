# StylingReactcomponents

## Concepts Learned

### Vanilla CSS files
  - Advantages:
    - Simple CSS code.
    - CSS code is decoupled from JSX and then import as needed.
  - Disadvantages:
    - CSS rules are not scoped with modules, resulting in clashing between 
      components.
### Inline styling with Vanilla CSS
  * Include the inline style within {} as an prop(object) (like JSX expression)
    ```
      const pColor= color ? 'red' : 'white';
      <p style={{color: pColor}}>Style me!</p>
    ```
    Note: The style prop is an object, hence enclosed with double parenthesis.
  * Advantages:
    - One way of scoping the CSS to a component.
  * Disadvantages:
    - CSS and JSX lies within same file, resulting in increasing dependency.
### Scoping CSS rules with module
  * Name the css file as *.module.css instead of *.css
  * Imports the *.module.css as an object.
    `import classes from './<component>.module.css';`
  * CSS rules written in *.module.css can be accessed with the object.
    `classes.controls`
    `classes[auth-input]`
    `classes.authInput` (Needs an update in the CSS file too.)
  * Dynamically generates the class names by appending an extra random string 
    to the classes(noticed when you inspect the element).
  * Advantages:
    - No clashes among the components even when same names are used.
### Styled Components (`npm install styled-components`)
  * Using another package called Styled Components.
    `import { styled } from 'styled-components';`
  * Cut the component specific styles and add into the .jsx file.
    ```
    const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;`
    ```
    Use the back-ticks to place the CSS rules.
  * Update the element with new StyledComponent name.
    `<label className="label">Test</label> => <Label>Test</label>`
  * All the Props and children of the element will be forwarded automatically to
    the Styled component.
  * On inspecting a webpage, you will notice all the class names will be shown 
    with some random texts instead of the class names.
  * Dynamically adding styling/CSS rules using classnames, Styled Components.
    - Conditionally adding class using computed variable.
      `<label className={emailNotValid ? classes.invalid : undefined}>Password</label>`
    - Conditionally adding class using Styled component.
    `<Label $invalid={emailNotValid}>Password</Label>`
    ```
      const Label = styled.label`
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ $invalid }) => $invalid ? '#f87171' : '#6b7280'};
    ```
    OR
    ```
      const Label = styled.label`
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${(props ) => props.$invalid ? '#f87171' : '#6b7280'};
    ```
    - Note the use of "$" for the props. This is to prevent clash with the 
      built-in props and could notice in warnings in console.
  * All the elements inside an element can also be styled using Styled 
    components along with media queries, pseudo-elements(Refer SRCHEADER.jsx).
  * To allow the concept of Resuability, we can build the styled components as 
    seperate components(Refer SRCButton.jsx).
### Tailwind CSS(https://tailwindcss.com/docs/guides/vite)
  * A Framework mainatained by Tailwind Team.
  * Generally noticed with React (seen on large scale projects).
  * Can use the pre-defined classes to style the elements with no need of 
    writing css rules.
  * Easily customizable for extending existing CSS rules.
  * Adapts to any design.
  * Build size is tiny.
  * Use an TailwindCSS intellisense extension to work with easy dropdown of available classes with IDE.
  * Installation:
    - Run the following
      ```
      npm install -D tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      ```
    - Update tailwind.config.js
      ```
      /** @type {import('tailwindcss').Config} */
      export default {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
      ```
    - Add the following directives to CSS(index.css).
      ```
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```
    - Re-run `npm run dev`
    - Start using the classes.
      ```
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      ```
    - To learn more about tailwind, Refer https://tailwindcss.com/docs/installation
  * Disadvantages:
    - Elements Ends up with Long list of classes. However, we can create 
      re-usable components with the Tailwind CSS.
    - Any style changes needs an editing of jsx code, hence resulting in no 
      strong seperation between styling and jsx.