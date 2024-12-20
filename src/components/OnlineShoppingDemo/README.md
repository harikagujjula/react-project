# Online shopping application

* This setup is similar to Project management where a state is being shared 
  across components and props being forwarded through other components. 
  Ex: Props being forwarded from OnlineShoppingDemo > Shop > Product and 
  similarly OnlineShoppingDemo > OSHeader > CartModal > Cart.

## Concepts
* Props drilling
  * Passing the props through multiple components
  * For example, To handle Add task, delete tasks, we are passing the handleAddTask, handleDeleteTask all the way from App > SelectedProject > Tasks > NewTask
  * Problem of shared state
  * Disadvantages:
    * Components might become less reusable
    * Unnecessary code to pass props all through multiple layers
  * Solution - Component Composition
    * Instead of passing props, wrap the component inside other component and just render it using children.
    * For example: The map function to render products in Shop.jsx can be copied and added inside wrapper of Shop in OnlineShoppingDemo.jsx. This way no need of sending props to Product component through Shop component.
    * Disadvantages:
      * One file can become too big if we try to move every such case into one file. And all other files might just act as wrappers.
