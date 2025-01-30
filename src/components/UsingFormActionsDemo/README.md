# Using From Actions

* Can be used only with React ^19.
* Uses action prop instead of onSubmit prop for the Form.
* This could seem similar to the form action that is noticed with html.
  <form action=""> </form>
  But with HTML forms, we specify the URL/path to send the form data to.
  Whereas with React, action receives the submit function as value and the
  default is always prevented.
* Action function formData object as an argument by React.
  * formData -> formData object, provided by browser captures all the form input values.
    Note: The formData object works when all the input fields have the name
    prop defined.
* The action function can be defined outside the component function or outsourced if we are
  not dealing with state or props of the component, so that we do not re-create
  the function each time on component execution.


## useStateAction hook

* React ^19 provides a hook to manage the form state based on the results of the
  form actions(submission).
* This hook provides the tools you need to build more interactive and responsive
  forms in your React applications.
* Use cases:
    * Whether you’re incrementing counters
    * Whether you’re displaying error messages
    * Preserving state across page navigations
      * prevFormState -> The previous values of the form if any else undefined.

### Implementation
* Called after action function and manages form state values.
  - First argument - the action function (signupAction)
  - Second argument - an initial state so that we can also capture when the form is
    not submitted yet.
  - Returns an array
      - formState - The formstate after submitting the form, returns all the entered values.
      - formAction - We pass our action to useActionState and React
        creates a new updated function by kind off wraping it with our action
        and This should be passed to the form action prop.
        <form action={signupAction}> => <form action={formAction}>
      - pending - true or false whether the form is currently being submitted or
        not. Usually used for async actions.
  ```
    const [formState, formAction] = useActionState(signupAction, {
      errors: null,
    });
  ```
* Update the form action props value with the function(formAction) returned by
  the useStateAction hook instead of the action function(signupAction).
* While using useStateAction, ensure the action function aceepts 2 arguments
  with formData becoming the 2nd argument. If this step is not considered, you
  might notice console errors saying "formData.get() is not a function".
  1. prevFormState - the Previous state of the form.
  2. formData -> formData object, provided by browser captures all the form input values.
* Input fields should be updated with the defaultValue prop instead of value prop
  to work with form actions.
  ```
    defaultValue={formState.enteredValues?.email}
  ```
  Note: Checkboxes should will be using defaultChecked prop.
  ```
    defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "friend"
            )}
  ```
  Note: The default value for the select dropdown does not seem to keep the
  original value on form submission with invalid data. Rather it resets to first
  value. This seems to be a known bug with React.
* Since the defaultValues are being set on form action, the reset button does
  not automatically empty the input fields. Rather sets to previous values(in
  case of invalid input).
  However, on Valid input, the form values will be noticed cleared as we are
  not returning any entered values and retuning just the errors: null. In this
  case, if we need the reset button to clear the input values entered, we may
  have to handle manually.


