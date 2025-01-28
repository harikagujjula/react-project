# Handling User forms with React

## Form Submissions
  * Can be done 3 ways
    * useState to manage entered values.
    * Can be extracted via refs.
      Pros:
        * All we need is to define the refs, attach to the input field and access
        using .current.
        * Less code compared with the state management, as no listeners required
        to track the changes, no code required to update their values on change.
      Cons:
        * Though we can reset the input values as email.current.value = '',
        as we learnt, it is not recommended to update the DOM manually.
    * Via FormData object and native browser functions.
  * By default the type for a button is submit. If we add a onClick for a button
    in a form, the form gets submitted. Though the Submit function gets
    triggered, you see the page also refreshes after Form submit, which is
    default form's behavior.
    To prevent that, we can add the submit function to the forms onSubmit and
    use event.preventDefault() which will prevent the default behavior of page
    reload. Note that this is necessary to be implemented for any form in React.
    * Another way of preventing page reload on form submission is by using Form
    actions that is only available with React >= 19.

## Form Validations
  * Providing a good user experience can be tricky.
  * Can validate the form:
    * On every keystroke => errors may be shown too early.
    * On lost focus of an input => errors may be shown too long.
    * On form submission => errors may be shown too late.

    We could combine all these methods to provide better user experience.

