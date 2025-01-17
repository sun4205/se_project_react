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
    avatar: currentUser?.avatar || "",
  });
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.avatar || !isValidUrl(values.avatar)) {
      console.warn("Invalid or empty avatar URL. Skipping avatar update.");
      values.avatar = ""; 
    }
    updateUserData(values.username, values.avatar,setCurrentUser,setActiveModal);
  };
  
  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);
  console.log("activeModal:", activeModal);
  return (
    <ModalWithForm
      isOpen={activeModal === "Edit-profile"}
      title="Edit Profile"
      buttonText={buttonText}
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      customClass="edit-profile-modal" 
      modalRef={modalRef}
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

      <label htmlFor="avatar" className="modal__label">
        Avatar 
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder="Avatar"
          value={values.avatar}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
