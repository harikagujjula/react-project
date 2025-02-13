# Handling User forms with React

## Form Submissions
  * Can be done 3 ways
    * useState to manage entered values.
      * Maintain states for all the inputs or a single state with inputs grouped together.
      * Define and add Listeners to input fields to track the changes.
      * Add value props with the state values for each input.
      * Use onSubmit action of the Form and define the submit functionality.
      * To reset the form values, Assign the state values to null/empty string/array, accordingly.
    * Can be extracted via refs.
      * Define Ref's for each input field.
      * Use onSubmit action of the Form and define the submit functionality.
      * To reset the values: use event.target.reset() which is same as setting
        the button type to reset.
      * Note that manually setting the values using email.current.value = '' is
       not a recommended way and should be done with caution, as React is
       responsible for updating DOM and we should not manually update them.
      Pros:
        * All we need is to define the refs, attach to the input field and access
        using .current.
        * Less code compared with the state management, as no listeners required
        to track the changes, no code required to update their values on change.
      Cons:
        * Though we can reset the input values as email.current.value = '',
        as we learnt, it is not recommended to update the DOM manually.
    * Via FormData object and native browser functions.
      * Use onSubmit action of the Form and define the submit functionality.
      * Note that to use FormData object to fetch the input values, ensure all
        the inputs have the name prop set.
      * Define a FormData object poitning to the form i.e by passing form as argument.
        ```
          const formData = new FormData(event.target);
        ```
        FormData is provided by the broswer as a built-in object.
      * Get all the data entries using one single method of formData obj.
        ```
          const data = Object.fromEntries(formData.entries());
        ```
          - formData.entries() - Method Retrieving all the input entries as an
            array(key-value pair).
          - Object.fromEntries() - Converting the array to object.
      * Note: Multi-valued fields cannot be fetched using the above method, as
        they would have same name. For multi-valued fields use the below and
        merge the final results.
        ```
          formData.getAll('acquisition');
        ```
      * To Reset, We could either use event.target.reset() or set button type to
        reset.
  * Prevent Page reload on submit => By default the type for a button is submit.
    If we add a onClick for a button in a form, the form gets submitted. Though
    the Submit function gets triggered, you see the page also refreshes after
    Form submit, which is default form's behavior.
    To prevent that, we can add the submit function to the forms onSubmit and
    use event.preventDefault() which will prevent the default behavior of page
    reload. *** Note that this is necessary to be implemented for any form in React. ***
    * Another way of preventing page reload on form submission is by using Form
    actions that is only available with React >= 19.

## Form Validations
  * Providing a good user experience can be tricky.
  * Can validate the form:
    * On every keystroke => errors may be shown too early.
    * On lost focus of an input => errors may be shown too long.
    * On form submission => errors may be shown too late.
  * Using State it is good way to combine the validation on every key stroke
    and on blur for a better experience (UFLoginUsingState)
  * Using Refs, it is better to validate on Submission of the form.
  * Validating on form submission is a good idea even though we are validating
    on key stroke, ob blur.
  * Another way of validation is by using built-in validation props provided by
    the browser like required, min-length etc.
    Note that required attribute not only validates for empty input, but also
    validates for valid inputs like an email should be a proper email address.
  * We could combine all these methods to provide better user experience, based
    on the experience required.

## There are also 3rd party libraries that could helkp with Form submissions,
## validations like Formik, React Form hook etc.
