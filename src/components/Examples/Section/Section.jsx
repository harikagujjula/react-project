// Creating a Custom Section component to organize by reusing the 
// component in Examples.jsx, CoreConcepts.jsx.

// The 3rd arg ...props is merging all other arguments into a js object and 
// being passed to the function. 
export default function Section({title, children, ...props}) {
return (
  <section {...props}>
    <h2>{title}</h2>
    {children}
  </section>
);
}