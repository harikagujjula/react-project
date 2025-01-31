import { useFormStatus } from "react-dom";

export default function UFAWHSubmit() {
  // Gives status information of the last form submission like pending, data,
  // method, action of which most common is pending which is true or false if
  // form is being submitted or not.
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting.." : "Submit"}
      </button>
    </p>
  );
}
