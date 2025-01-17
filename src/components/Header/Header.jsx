import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { initialsPlaceholder } from "../../utils/inicialPlaceHolder";

function Header({
  openRegisterModal,
  openLoginModal,
  weatherData,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const avatar = currentUser?.avatar || avatarPlaceholder;
  const username = currentUser?.name || "User Avatar";
  console.log("Current User:", currentUser);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__controls">
        <ToggleSwitch />
        {!currentUser ? (
          <div className="header__auth-buttons">
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              +Add clothes
            </button>

            <div className="header__user-container">
              <Link to="/profile" className="header__link">
              {currentUser.avatar ? (
            <img className="header__avatar" src={avatar} alt={username} />
          ) : (
            <div className="header__placeholder">
              {initialsPlaceholder (username)} 
            </div>
          )}
              </Link>
             
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
