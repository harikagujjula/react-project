import { memo } from 'react';
import { log } from './../log.js';

/* Using memo to prevent re-renders of the IconButton and Icon when the parent component re-renders.
 However, the components might be still re-rendering because of the props passed to
 <button>. children and icon are not dynamic. props has a function(handleDecrement) being passed
 as value and as we learnt eventhough functions in javascript are objects and
 eventhough there is no change with code, they are treated as new. */
const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
