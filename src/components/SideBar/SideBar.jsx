import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { initialsPlaceholder } from "../../utils/inicialPlaceHolder";

const SideBar = ({ handleLogOut, changeCurrentUserData }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const avatar = currentUser?.avatar || avatar;
  const username = currentUser?.name || "User Avatar"
  
  
  return (
    <div className="sideBar">
      <div className="sideBar__userInfo">
      {currentUser?.avatar? (
          <img className="sideBar__avatar" src={avatar} alt={username} />
        ) : (
          <div className="sideBar__avatar-placeholder">
            { initialsPlaceholder(username || "User")} 
          </div>
        )}
        <p className="sideBar__userName">{username || "User Avatar"}</p>
      </div>
      <div className="sideBar__editProfile">
        <button
          className="sideBar__changeUserData"
          onClick={changeCurrentUserData}
          type="button"
        >
          Change Profile Data
        </button>
        <button
          className="sideBar__logout"
          onClick={handleLogOut}
          type="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
