import close from "../../assets/close_button.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  handleCloseClick,
  onSubmit,
  modalRef,
}) {
  console.log("Modal Button Text:", buttonText);
  return (
    <div className={`modal  ${isOpen ? "modal_opened" : ""}`} ref={modalRef}>
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
          <button type="submit" className="modal__submit">
            {buttonText} 
          </button>
          <button type="submit" className="modal__submit modal__submit_without-border">or Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
