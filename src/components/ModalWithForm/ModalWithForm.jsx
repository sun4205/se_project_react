import close from "../../assets/close_button.svg";
import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button type="button" className="modal__close">
          <img src={close} alt="close_button" />
        </button>
        <form className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>

          <label htmlFor="ImageUrl" className="modal__label">
            Image
            <input
              type="text"
              className="modal__input"
              id="IamgeUrl"
              placeholder="Image URL"
            />
          </label>

          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio_input" />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio_input" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio_input" />
              Cold
            </label>
          </fieldset>
          <button type="submit" className="modal__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
