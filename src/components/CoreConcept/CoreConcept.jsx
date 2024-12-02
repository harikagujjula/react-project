// Making use of Object destructuring for parameter props.
export default function CoreConcept ({image, title, description}) {
  return (
    <li>
      <img src={image} alt={title}/>
      <title>{title}</title>
      <description> {description} </description>
    </li>
  );
}