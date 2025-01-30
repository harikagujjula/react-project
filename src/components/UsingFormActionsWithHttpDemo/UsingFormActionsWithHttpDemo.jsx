import { UFAWHHeader } from "./UFAWHHeader";
import { UFAWHOpinions } from "./UFAWHOpinions";
import { UFAWHNewOpinion } from "./UFAWHNewOpinion";
import { OpinionsContextProvider } from "../../store/opinions-context";
import "./UsingFormActionsWithHttpDemo.css";

export default function UsingFormActionsWithHttpDemo() {
  return (
    <>
      <UFAWHHeader />
      <main>
        <OpinionsContextProvider>
          <UFAWHNewOpinion />
          <UFAWHOpinions />
        </OpinionsContextProvider>
      </main>
    </>
  );
}
