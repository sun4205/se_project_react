import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { initialsPlaceholder } from "../../utils/inicialPlaceHolder";

const SideBar = ({ handleLogOut, changeCurrentUserData }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const avatarUrl = currentUser?.avatar || avatar;
  const userName = currentUser?.name || "User Avatar";
  console.log("avatarUrl:", avatarUrl);
  console.log("currentUser.avatarUrl:", currentUser?.avatar);
  return (
    <div className="sideBar">
      <div className="sideBar__userInfo">
      {currentUser?.avatarUrl ? (
          <img className="sideBar__avatar" src={avatarUrl} alt={userName} />
        ) : (
          <div className="sideBar__avatar-placeholder">
            { initialsPlaceholder(userName)} 
          </div>
        )}
        <p className="sideBar__userName">{userName}</p>
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
