// Receiving component identifier(comp type) as a value for the prop. This prop
// should be usable as a custom component in the receiving component
// (Tabs in this case). i.e should start with uppercase - ButtonsContainer.

export default function Tabs({children, buttons, ButtonsContainer = 'menu'}) {
  // If using built in element, have to declare it using const. 
  // const ButtonsContainer = buttonsContainer
  return (
    <>
    <ButtonsContainer>
      {buttons}
    </ButtonsContainer>
      {children}
    </>
  );
}