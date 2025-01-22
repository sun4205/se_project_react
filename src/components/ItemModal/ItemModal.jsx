import "./ItemModal.css";
import close from "../../assets/close_button.svg";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ItemModal({
  activeModal,
  onClose,
  card,
  handleDeleteClick,
  currentUser,
  modalRef,
  closeActiveModal,
}) {
  

  const isOwn = card?.owner === currentUser?._id;

  
  return (
    <ModalWithForm modalRef={modalRef} closeActiveModal={closeActiveModal}>
      <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="close_button" />
          </button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />

          <div className="modal__footer">
            <section className="modal__footer-section">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </section>
            <section>
              {isOwn && (
                <button
                  onClick={() => handleDeleteClick(card)}
                  type="button"
                  className="modal__delete"
                >
                  Delete item
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default ItemModal;
