import close from "../../assets/close_button.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  secondaryButtonText,
  onSecondaryClick,
  isOpen,
  handleCloseClick,
  onSubmit,
  modalRef,
  customClass,
}) {
  console.log("Modal Button Text:", buttonText);
  return (
    <div
      className={`modal  ${isOpen ? "modal_opened" : ""} ${customClass || ""}`}
      ref={modalRef}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close_button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className={`modal__submit ${
                customClass === "edit-profile-modal"
                  ? "modal__submit_black"
                  : ""
              }`}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__submit modal__submit_without-border"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
