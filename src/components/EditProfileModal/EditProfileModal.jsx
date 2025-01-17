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
  setCurrentUser,
  setActiveModal,
  updateUserSubmit
}) => {
  const { values, handleChange } = useForm({
    username: currentUser?.username || "",
    avatarUrl: currentUser?.avatarUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(values.username, values.avatarUrl,setCurrentUser,setActiveModal);
  };
  
  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);
  return (
    <ModalWithForm
      isOpen={activeModal === "Edit-profile"}
      title="Edit Profile"
      buttonText={buttonText}
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      customClass="edit-profile-modal" 
    >
      <label htmlFor="username" className="modal__label">
        Name
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Name"
          value={values.username}
          onChange={handleChange}
          className="modal__input"
        />
      </label>

      <label htmlFor="avatarUrl" className="modal__label">
        Avatar 
        <input
          type="text"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar"
          value={values.avatarUrl}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
