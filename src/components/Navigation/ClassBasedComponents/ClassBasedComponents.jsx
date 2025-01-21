import ClassBasedComponentsDemo from "../../ClassBasedComponentsDemo/ClassBasedComponentsDemo";

export default function ClassBasedComponents() {
 return (
   <>
     <div id="content">
       <header>
         <h1>Class Based components</h1>
         <ul>
           <li>
               This is Traditional way of creating components in React before
               16.8 version.
           </li>
           <li>
                In earlier versions, class based components were used to manage
                state and lifecycle methods.
           </li>
           <li>
               This component is built for Learning to transform to Class based components.
           </li>
           <li>
               This is not the recommended way of creating components in React
               anymore.
           </li>
         </ul>
       </header>
       <ClassBasedComponentsDemo />
     </div>
   </>
 );
}
