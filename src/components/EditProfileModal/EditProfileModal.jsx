import React, { useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";
import useEscapeKey from "../../utils/useEscapeKey";

const EditProfileModal = ({
  activeModal,
  closeActiveModal,
  buttonText,
  currentUser,
  updateUserData,
}) => {
  const { values, handleChange } = useForm({
    username: currentUser.username || "",
    avatarUrl: currentUser.avatarUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(values.username, values.avatarUrl);
  };
  
  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);
  return (
    <ModalWithForm
      isOpen={activeModal === "edit-profile"}
      title="Edit Profile"
      buttonText={buttonText}
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="username" className="modal__label">
        Username
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          className="modal__input"
        />
      </label>

      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL
        <input
          type="text"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
