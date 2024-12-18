import { useRef, useImperativeHandle, forwardRef } from "react";


/* Form comp function wrapped with forwardRef. Note When using forwardRef, 
  function accepts 2 arguments, first being props and second being ref prop as 
  a value passed form the parent. */
const RefsForm = forwardRef(function Form(props, ref) {
  // Creating a ref to the form element.
  const form = useRef();

  // 2 arguments, first is the ref passed by parent and second the array of methods to be exposed.
  useImperativeHandle(ref, () => {
    return {
      // Exposing reset of the form element to be called using clear().
      clear() {
        form.current.reset();
      },
      // More methods to be exposed here..
    };
  });

  return (
    <form ref={form}>
      <p>
        <label>Name</label>
        <input type="text"/>
      </p>
      <p>
        <label>Email</label>
        <input type="email"/>
      </p>
      <p>
        {/* For now Save does not do anything. */}
        <button id="actions">Save</button>
      </p>
    </form>
  );
});

export default RefsForm;