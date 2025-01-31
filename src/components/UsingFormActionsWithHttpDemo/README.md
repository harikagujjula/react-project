# Using Form actions with HTTP requests

## Development notes:
  * Uses backend_using_form_actions folder to connect with node.js server.
  * Ensure navigating to corresponding backend folder and run npm install,
    npm start to start the backedn server, followed by npm run dev on the react
    project root.
  * Ensure changing of the ports package.json for the backend folders
    accordingly as we have maintained a single repo for multiple tasks.

## Concepts learned
  * Submitting the form data with form actions to the backend server.
  * Using use() to access the opinion context.
  * Usage of useFormStatus () hook provided by React.
    * Gives status information of the last form submission.
    * Used to prevent multiple click of submit button while it is processing the
    submit function.
    * Import it from react-dom.
    * Should be used in conjuction with form actions.
    * Cannot be used in the same component where the form is defined. Rather
    should be used in a nested component.
  * Registering multiple form actions.
    * Like we have action prop for Form, Each button can accept formAction prop
      to allow different actions with each button.
