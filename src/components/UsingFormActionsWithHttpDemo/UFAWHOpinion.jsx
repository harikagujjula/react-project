import { use, useActionState } from "react";
import { OpinionsContext } from "../../store/opinions-context";
import { useOptimistic } from "react";

export function UFAWHOpinion({
  opinion: { id, title, body, userName, votes },
}) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  /* When we click on upvote or downvote, it takes an ample amount of seconds to
   see it is updated in th UI. We can do this more optimistically by using
   useOptimistic hook.
   useOptimistic() hook is used in conjuction with form actions to optimistically
   i.e immediately present the user the result of performing an action( a
   different state), eventhough the action actually takes time to complete.

  Receives:
    first argument - The property that has to be updated opmistically.
    second argument - A function that receives old state. Function here also
                      accepting mode which is a custom argument sent by us to
                      determine up or down vote.
                      Note that Any custom arguments to this function should
                      also be passed to the function that is returned by
                      useOptimistic (setVotesOptimistically).
  Returns an array:
    - The optimistic state that is updated. This is a temporary state that will
      be shown in the UI while we are actually waiting for the submit/action
      process to be completed.
    - The function to determine if we want to invoke the optimistic function
      logic we added. This function should/can be called inside any form action,
      as useOptimistic is used to work in conjunction with form actions, but
      before sending the request.
      */
  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  // Note we are creating these async functions inside the component because we
  // will need the id property.
  async function upvoteAction() {
    // Calling the function returned by useOptimistic() hook before sending the
    // request, so that the temporary state will be shown while waiting for the
    // request/response to be completed.
    setVotesOptimistically("up");
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  // Using useActionState() to capture the form status so that the upvote and
  // downvote are disabled when an action is being performed already.
  // We may have to destructure this even though we do not use all those returned by useActionState.
  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(
    upvoteAction,
    null
  );
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction, null);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
