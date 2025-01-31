import { useActionState, use } from "react";
import { OpinionsContext } from "../../store/opinions-context";
import UFAWHSubmit from "./UFAWHSubmit";

export function UFAWHNewOpinion() {
  // Using use() as this is Rect ^19 to access the context.
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must be atleast five characters long.");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 to 300 characters long.");
    }
    if (!userName.trim()) {
      errors.push("Please provide username.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    // Submit the opinion to backend.
    /* As addOpinion() is a async function, we are waiting for the response.
    So adding await for addOpinion. Also to make use of await, the function
    with await should be declared as async. */
    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  // Managing the formstate values using useActionState hook.
  /* Could make use of pending for async response so that the submit button
     could be disabled while waiting for the response and so preventing user to
     submit multiple times, while processing.

     For now, using another hook useFormStatus() that can be used in conjuction
     with form actions. But useFormStatus() should not be used in the same
     component function that has the form, rather should be included in nested
     component.  Since we do not have one nested component, lets create a
     component function for submit.*/
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <UFAWHSubmit />
      </form>
    </div>
  );
}
