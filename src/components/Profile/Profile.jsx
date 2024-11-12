import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";
import "./Profile.css";

const Profile = () => {
  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
  };
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection handleCardClick={handleCardClick} />
      </section>
    </div>
  );
};

export default Profile;
