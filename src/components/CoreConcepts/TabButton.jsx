// export default function TabButton(props) {
//   return <li><button>{props.children}</button></li>;
// }

// Anything betwen the components is accessed via props children.
export default function TabButton({children}) {
  function handleClick() {
    console.log('hello world!');
  }

  return (
    <li>
      {/* Make sure we do not use () while calling the function to prevent execution. */}
    <button onClick={handleClick}>{children}</button>
    </li>
  );
}