
import React, { useRef, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";
import useEscapeKey from "../../utils/useEscapeKey";

const RegisterModal = ({
  activeModal,
  closeActiveModal, 
  handleRegisterSubmit,
  buttonText = "sign up",
  setActiveModal,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "", 
  });

  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleRegisterSubmit(values);
    closeActiveModal();
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "register"} 
      title="Sign up" 
      buttonText={buttonText}
      activeModal={activeModal}
      secondaryButtonText="or Log In" 
      onSecondaryClick={() => setActiveModal("login")} 
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
    >
      <label htmlFor="email" className="modal__label">
        Email*
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
        Password*
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

      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          id="avatarURL" 
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
