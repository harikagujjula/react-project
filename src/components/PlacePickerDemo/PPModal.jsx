import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Getting rid of the useImperativeHandle() hook and using forwardRef() instead to make use of useEffect hook.
function PPModal({ open, children }) {
  const dialog = useRef();

  /* Note: dialog.current.showModal()  is responsible for opening the dialog and also
   blurring the background and is needed eventhough we are passing the open prop. */

  /* Without the useEffect() hook, the dialog.current will be null as the dialog ref is not yet assigned.
    This is because the dialog ref is assigned only after the component is rendered.
    And useEffect() is executed right after the component execution, dialog ref will then be available.

    This can also be considered as a side effect as the dialog open and close
    will not have an direct impact on the current component but have an impact on the UI. */
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    else {
      dialog.current.close();
    }
    // Dependency is a prop or state that is used inside the useEffect() hook.
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default PPModal;
