import { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import './App.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function App() {
  const [weatherData,setWeatherData] = useState({type:""});

  return (
    <div className='page'>
      <div className='page__content'>
        <Header />
        <Main weatherData={weatherData}/>
      </div>
      <ModalWithForm />
    </div>
  )
}

export default App
