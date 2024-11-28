// export default function TabButton(props) {
//   return <li><button>{props.children}</button></li>;
// }

// Anything betwen the components is accessed via props children.
export default function TabButton({children, onSelect, isSelected}) {

  return (
    <li>
      {/* Make sure we do not use () while calling the function to prevent execution. */}
    <button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button>
    </li>
  );
}