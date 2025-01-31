import { useActionState, use } from "react";
import { OpinionsContext } from "../../store/opinions-context";

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

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
