import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    console.log("Clicked card:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    
    // console.log(e.target);
    console.log(values)
  }

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("API response:", data);
        const filterData = filterWeatherData(data,currentTemperatureUnit);
        console.log("Filtered data:", filterData);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);
  console.log(currentTemperatureUnit);
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        {/* <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
        >
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
              id="ImageUrl"
              placeholder="Image URL"
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
              />
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm> */}
        <AddItemModal activeModal={activeModal} closeActiveModal={closeActiveModal} onAddItem={onAddItem}/>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
