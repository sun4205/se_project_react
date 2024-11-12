import avatar from "../../assets/avatar.svg";
import './SideBar.css';

const SideBar = () => {
    return(
        <div className = 'sideBar'>       
        <img className="sideBar__avatar" src={avatar} alt="Terrence Tegegine" />
        <p className='sideBar__userName'>Terrence Tegegine</p>
    </div>

    )
}

export default SideBar;