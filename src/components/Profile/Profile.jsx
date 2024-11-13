import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";
import "./Profile.css";

const Profile = ({onCardClick}) => {
 
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
};

export default Profile;
