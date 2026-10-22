import React, { useLayoutEffect, useRef } from "react";
export default function Modal({ children, onDismiss, ...props }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      {...props}
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onDismiss();
      }}
      onClick={(e) => {
        if (e.target !== ref.current) return;
        const r = e.target.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onDismiss();
      }}
    >
      {children}
    </dialog>
  );
}
