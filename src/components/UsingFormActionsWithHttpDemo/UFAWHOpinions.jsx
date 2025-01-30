import { use } from "react";

import { UFAWHOpinion } from "./UFAWHOpinion";
import { OpinionsContext } from "../../store/opinions-context";

export function UFAWHOpinions() {
  const { opinions } = use(OpinionsContext);

  return (
    <div id="opinions">
      <h2>User Opinions</h2>
      {opinions && (
        <ul>
          {opinions.map((o) => (
            <li key={o.id}>
              <UFAWHOpinion opinion={o} />
            </li>
          ))}
        </ul>
      )}
      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
}
