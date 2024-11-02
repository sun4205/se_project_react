import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.svg';

function Header({handleAddClick}){
    return(
        <header className="header">
        <img className='header__logo' src={logo} alt="logo" />
        <p className='header__date-and-location'>date and location</p>
        <button onClick={handleAddClick} type="button" className='header__add-clothes-btn'>+Add clothes</button>
        <div className="header__user-container">
            <p className='header__userName'>Terrence Tegegine</p>
            <img className="header__avatar" src={avatar} alt='Terrence Tegegine'/>
        </div>
        </header>

    )
}

export default Header;