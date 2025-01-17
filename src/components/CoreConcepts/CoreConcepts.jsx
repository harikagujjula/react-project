import CoreConcept from "./CoreConcept/CoreConcept";
import { CORE_CONCEPTS } from "../Examples/data";
import Section from "../Examples/Section/Section";

export default function CoreConcepts () {
  return (
    <Section title="Core Concepts" id="core-concepts">
    <ul>
      {/* Transforming the arrays of objects to jsx code to render the list dyanamically. */}
      {CORE_CONCEPTS.map((conceptItem) => (
        <CoreConcept key={conceptItem.title} {...conceptItem} />
      ))}
      </ul>
    </Section>
  );
}