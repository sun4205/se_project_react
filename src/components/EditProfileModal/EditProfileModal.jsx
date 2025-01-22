import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";

const EditProfileModal = ({
  activeModal,
  closeActiveModal,
  buttonText,
  currentUser,
  setCurrentUser,
  modalRef,
  updateUserSubmit,
}) => {
  const { values, handleChange } = useForm({
    username: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserSubmit(
      values.username,
      values.avatar,
      setCurrentUser,
      closeActiveModal
    );
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "Edit-profile"}
      title="Edit Profile"
      buttonText={buttonText}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
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
          placeholder={currentUser?.name}
          value={values.name}
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
          placeholder={currentUser?.avatar}
          value={values.avatar}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
