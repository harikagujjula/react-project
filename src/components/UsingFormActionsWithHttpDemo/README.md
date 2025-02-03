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
  * Using *** use() *** to access the opinion context.
  * Usage of *** useFormStatus() ***  hook provided by React DOM.
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
  * Usage of *** pending *** state for button form actions that is provided by
    useActionState() to disable buttons after submitting until the process is
    completed.
    *** Note: ***
    We could also make use of useFormStatus() but we will have to outsource that
    in a nested component.
  * Usage of *** useOptimistic() *** hook provided by React hook.
    * To be used in conjuction with form actions.
    * To show a different state while an async function is underway to return
      response for better UI.
      In this example, when a user clicks on upvote/downvote, the number takes a
      few seconds to update, as the form action is sending a request to the backend
      and returning a response. So for a better UI, we show a temporary state that
      will be calculated using the optimistic function and pnce we have the
      response, we update it with actual state. If there is an error response
      being sent, in such cases, the opmistic state would be reverted back to the
      actual previous state.
    * Receives:
      1st argument - The property that has to be updated opmistically.
      2nd argument - A function that receives old state as a required argument
        passed by react.
        Note: This function can also receive a set of custom arguments as needed.
        But, we should ensure, Any custom arguments to this function should also
        be passed to the function that is returned by useOptimistic
        (i.e setVotesOptimistically()).
      Returns an array similar to useState():
      - The optimistic state that is updated. This is a temporary state that will
        be shown in the UI while we are actually waiting for the submit/action
        process to be completed.
      - The function to determine if we want to invoke the optimistic function
        logic we added. This function should/can be called inside any form action,
        as useOptimistic is used to work in conjunction with form actions, but
        before sending the request.
        ```
        const [optimisticState, setOptimistically] =
        useOptimistic(<value_to_be_updated_optmistically>,(prevVotes) => <function>);
        ```
    * Ensure the value to be updated is replaced by the optimistic state
      returned by useOptimistic().



