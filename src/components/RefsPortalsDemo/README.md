# Refs
* We could make use of Ref feature to refer a element and keep the code lean 
  without having to use multiple states for each/any element that do not have 
  direct impact on the UI.
* We can also use Ref to keep track of element that do not impact the UI and 
  still need to manage the element so that its data is not lost or reset on 
  component re-execution.
* Provided by useRef hook.
* Any React/HTML element can have ref prop automatically.
* A ref variable should be declared as a constant similar to state, and can have
  access to all the properties or methods of the html element(with current).
* Ref variable will always and only have "current" object.
* State should be used with the values that are directly refclected in the UI 
  and causes the component to re-execute on change. 
* Whereas Ref should be used with the values that are not directly shown on UI,
  like reading values from DOM, accessing browser API's etc. And the component 
  will not be re-executed if a ref variable changes.
* Though it is possible to update DOM via ref variable, Updating DOM should be 
  avoided as React is Declarative and hence DOM updates will be done by React.
* Refs can be forwarded between the components.
* With React version >= 19, ref can be forwarded from one component to other 
  just like a prop.
* With React version <19, to forward ref, we have to import forwardRef from react,
  wrap the component function(that needs ref as a prop) with forwardRef() and
  send the ref value as second parameter. (For reference: Look at the commented 
  code in ResultModal.jsx).