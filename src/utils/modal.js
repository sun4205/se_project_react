import React, { useEffect, useRef } from "react";

const Modal = ({ name, isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClick = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      ref={modalRef}
    >
      <div className="modal__container">
        {children}
        <button className="modal__close" type="button" onClick={onClose}>
          <img src="/path/to/close_button.svg" alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
