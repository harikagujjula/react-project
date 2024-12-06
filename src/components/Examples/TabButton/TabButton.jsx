// export default function TabButton(props) {
//   return <li><button>{props.children}</button></li>;
// }

// Anything betwen the components is accessed via props children.
export default function TabButton({children, isSelected, ...props}) {

  return (
    <li>
    {/* Fast forwarding the props which also includes onClick button listener. */}
    <button className={isSelected ? 'active' : undefined} {...props}>{children}</button>
    </li>
  );
}