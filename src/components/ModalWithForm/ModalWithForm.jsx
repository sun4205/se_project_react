import close from "../../assets/close_button.svg";
import "./ModalWithForm.css";
import  Modal from '../../utils/modal';

function ModalWithForm({
  children,
  name,
  onClose,
  buttonText,
  title,
  activeModal,
  isOpen,
  handleCloseClick,
  onSubmit
  
}) {
  console.log("Modal Button Text:", buttonText); 
  return (
    // <div className={`modal  ${isOpen ? "modal_opened" : ""}`}>
    //   <div className="modal__content">
    //     <h2 className="modal__title">{title}</h2>
    //     <button
    //       onClick={handleCloseClick}
    //       type="button"
    //       className="modal__close"
    //     >
    //       <img src={close} alt="close_button" />
    //     </button>
    //     <form onSubmit={onSubmit} className="modal__form">
    //       {children}
    //       <button type="submit" className="modal__submit">
    //         {buttonText}
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
    <h2 className="modal__title">{title}</h2>
    <form onSubmit={onSubmit} className="modal__form">
      {children}
      <button type="submit" className="modal__submit">
        {buttonText}
      </button>
    </form>
  </Modal>
  );
};

export default ModalWithForm;
