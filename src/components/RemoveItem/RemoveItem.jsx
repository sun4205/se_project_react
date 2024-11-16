import "./RemoveItem.css";
import close from "../../assets/close_button.svg";

const RemoveItem = ({ activeModal, onClose, handleDeleteConfirm }) => {
  return (
    <div
      className={`modal modal__remove-item ${
        activeModal === "remove-item" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content-remove">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close_button" />
        </button>
        <div className="remove__text-container">
          <p className="remove__font">
            Are you sure you want to delete this item?
          </p>
          <p className="remove__font">This action is irreversible.</p>
        </div>
        <div className="removeItem__buttons">
          <button
            onClick={() => {
              console.log("Delete confirmed");
              handleDeleteConfirm();
            }}
            type="button"
            className="removeItem__button"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="removeItem__cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItem;
