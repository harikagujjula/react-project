import CoreConcept from "../CoreConcept/CoreConcept";
import { CORE_CONCEPTS } from "./../../data";

export default function CoreConcepts () {
  return (
    <section id="core-concepts">
    <h2>Core Concepts</h2>
    <ul>
      {/* Transforming the arrays of objects to jsx code to render the list dyanamically. */}
      {CORE_CONCEPTS.map((conceptItem) => (
        <CoreConcept key={conceptItem.title} {...conceptItem} />
      ))}
      </ul>
    </section>
  );
}