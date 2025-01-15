import React, { useEffect, useState, useRef, act } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import RemoveItem from "../RemoveItem/RemoveItem";
import useEscapeKey from "../../utils/useEscapeKey";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { setToken, getToken, removeToken } from "../../utils/token";
import {
  getItems,
  addItem,
  updateUserData,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, getUserInfo } from "../../utils/auth";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", avatarURL: "" });

  const navigate = useNavigate();
  const location = useLocation();

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

  const changeCurrentUserData = () => {
    setActiveModal("Edit-profile");
    console.log("clicked");
  };

  const openRegisterModal = () => {
    console.log("Opening register modal");
    setActiveModal("register");
  };

  const openLoginModal = () => {
    console.log("opening login modal ");
    setActiveModal("login");
  };

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

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);

          setCurrentUser({ ...data.user, _id: data.user._id });
          const redirectPath = location.state?.from?.pathname || "";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    console.log("Current User:", currentUser);
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .getUserInfo(jwt)
      .then(({ username, email, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ username, email, _id });
      })
      .catch(console.error);
  }, []);

  const handleLogOut = () => {
    console.log("Log Out button clicked.");
    navigate("/signin");
    removeToken();
    setIsLoggedIn(false);
    setActiveModal("signin");
    console.log("User logged out successfully.");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api

          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api

          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => console.error("Error during registration or login:", err))
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
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              openLoginModal={openLoginModal}
              openRegisterModal={openRegisterModal}
              weatherData={weatherData}
              handleAddClick={handleAddClick}
            />
            <Routes>
              <Route
                path="/signin"
                element={
                  <LoginModal
                    activeModal={activeModal}
                    closeActiveModal={closeActiveModal}
                    buttonText="LogIn"
                    handleLogin={handleLogin}
                    setActiveModal={setActiveModal}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    changeCurrentUserData={changeCurrentUserData}
                    handleLogOut={handleLogOut}
                    updateUserData={updateUserData}
                    currentUser={currentUser}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleRegisterSubmit={handleRegisterSubmit}
            setActiveModal={setActiveModal}
            buttonText={isLoading ? "Register..." : "Sign up"}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            buttonText="Save changes"
            currentUser={currentUser}
            updateUserData={updateUserData}
          />

          <AddItemModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleAddItemSubmit={handleAddItemSubmit}
            buttonText={isLoading ? "Saving..." : "add garment"}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
            onCardLike={handleCardLike}
          />
          <RemoveItem
            activeModal={isRemoveItemModalOpen ? "remove-item" : ""}
            onClose={closeRemoveItemModal}
            onConfirm={handleDeleteConfirm}
            buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
          />
          {/* <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            buttonText="LogIn"
            handleLogin={handleLogin}
            setActiveModal={setActiveModal}
          /> */}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
