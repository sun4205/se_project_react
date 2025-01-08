
import React, { useRef, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";
import useEscapeKey from "../../utils/useEscapeKey";

const LoginModal = ({
  activeModal,
  closeActiveModal,  
  buttonText,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    
  });

  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleLoginSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "login"} 
      title="Login" 
      buttonText={buttonText}
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email" 
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password" 
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>

      
    </ModalWithForm>
  );
};

export default LoginModal;