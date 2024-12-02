// Working with multiple JSX slots.
export default function Tabs({children, buttons}) {
  return (
    <>
    <menu>
      {buttons}
    </menu>
      {children}
    </>
  );
}