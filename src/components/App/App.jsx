import React, { useEffect, useState, useRef, act } from "react";
import { Routes, Route } from "react-router-dom";
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
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, removeItem } from "../../utils/api";
import RemoveItem from "../RemoveItem/RemoveItem";
import useEscapeKey from "../../utils/useEscapeKey";
import { register, authorize } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
 
  

  const openRemoveItemModal = (card) => {
    setSelectedCard(card);
    setIsRemoveItemModalOpen(true);
  };
  const closeRemoveItemModal = () => setIsRemoveItemModalOpen(false);

  const handleCardClick = (card) => {
    console.log("Clicked card:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    console.log("handleDeleteClick called with card:", card);
    setSelectedCard(card);
    openRemoveItemModal(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openRegisterModal = () => {
    console.log("Opening register modal");
    setActiveModal("register");
  };

  const openLoginModal = () =>{
    console.log("opening login modal ");
    setActiveModal("login");
  }

   

  const closeActiveModal = () => {
    setActiveModal("");
  };
  const modalRef = useRef(null);

  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    console.log("handleAddItemSubmit called with item:", item);
    setIsLoading(true);
    console.log("Button Text:", isLoading ? "Saving..." : "Save");

    addItem(item)
      .then((newItem) => {
        console.log("Current clothingItems before update:", clothingItems);
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const handleRegisterSubmit = (values) => {
    console.log("handleRegisterSubmit called with values:", values);
    setIsLoading(true);

    register(values.name, values.avatarURL, values.email, values.password)
      .then(() => {
        console.log("Registration successful, signing in...");
        return authorize(values.email, values.password);
      })
      .then((userData) => {
        console.log("User logged in successfully:", userData);
        closeActiveModal();
      })
      .catch((err) => console.error("Error during registration or login:", err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const handleLoginSubmit = (values) => {
    console.log("handleLoginrSubmit called with values:", values);
    setIsLoading(true);

    login(values.email, values.password)
      .then(() => {
        console.log("Login is successful, Loging in...");
        return authorize(values.email, values.password);
      })
      .then((userData) => {
        console.log("User logged in successfully:", userData);
        closeActiveModal();
      })
      .catch((err) => console.error("Error during login:", err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const handleDeleteConfirm = () => {
    if (selectedCard) {
      setIsLoading(true);
      removeItem(selectedCard._id)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );

          setDeleteConfirmation(false);
          closeRemoveItemModal();
          closeActiveModal();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("API response:", data);
        const filterData = filterWeatherData(data, currentTemperatureUnit);
        console.log("Filtered data:", filterData);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
          <Header openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            {/* <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            /> */}
          </Routes>

          <Footer />
        </div>

        <RegisterModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          handleRegisterSubmit={handleRegisterSubmit}
          buttonText={isLoading ? "Register..." : "Next"}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
        />
        <RemoveItem
          activeModal={isRemoveItemModalOpen ? "remove-item" : ""}
          onClose={closeRemoveItemModal}
          onConfirm={handleDeleteConfirm}
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
        <LoginModal
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        handleRegisterSubmit={handleLoginSubmit}
        buttonText={isLoading ? "logging in..." : "login"}
        />
        
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
