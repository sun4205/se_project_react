import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({activeModal,closeActiveModal,onAddItem}) => {
    const [name, setName] = useState("");

    const handleNameChange = (e) =>{
        console.log(e.target.value)
        setName(e.target.value);
    }

    const [imageUrl, setImageUrl] = useState("");

    const handleImageUrlChange = (e) =>{
        console.log(e.target.value)
        setImageUrl(e.target.value);
    }

    const [weather, setWeather] =useState("");

    const handleWeatherChange = (e) => {
        console.log(e.target.value);
        setWeather(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({name,imageUrl,weather})
    }

    return(
        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </label>

          <label htmlFor="ImageUrl" className="modal__label">
            Image
            <input
              type="text"
              className="modal__input"
              id="ImageUrl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={handleImageUrlChange}
            />
          </label>

          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>

            <div>
              <input
                id="hot"
                type="radio"
                className="modal__radio_input"
                name="weather"
                value="hot"
                checked={weather === "hot"}
                onChange={handleWeatherChange}
              />
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                Hot
              </label>
            </div>

            <div>
              <input
                id="warm"
                type="radio"
                className="modal__radio_input"
                name="weather"
                value="warm"
                checked={weather === "warm"}
                onChange={handleWeatherChange}
              />
              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                Warm
              </label>
            </div>

            <div>
              <input
                id="cold"
                type="radio"
                className="modal__radio_input"
                name="weather"
                value="cold"
                checked={weather === "cold"}
                onChange={handleWeatherChange}
              />
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;