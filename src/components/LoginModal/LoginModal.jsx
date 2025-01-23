import React, { useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";


const LoginModal = ({
  activeModal,
  closeActiveModal,
  buttonText = "Login",
  handleLogin,
  setActiveModal,
  modalRef,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleLogin({
      username: values.email,
      password: values.password,
    });
    
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "login"}
      title="Login"
      buttonText={buttonText}      
      onSecondaryClick={() => setActiveModal("login")}     
      activeModal={activeModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
      closeActiveModal={closeActiveModal}
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
