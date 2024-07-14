import React, { useState } from 'react';
import './App.css';
// import { Header } from './components/Header';
import LogInForm from './components/LogInForm';
import { UserProvider } from './useContext';
import { MineBlock } from './components/MineBlock';
import { SendTransaction } from './components/SendTransaction';
import { GetDarkMatter } from './components/DarkMatter';
import RegisterForm from './components/Register';
import { RouterProvider } from 'react-router-dom';
import { darkMatterRouter } from './Router.jsx';


const App = () => {

  return (

    <div>
      <UserProvider>
        <RouterProvider router={darkMatterRouter} />
      </UserProvider>
    </div>

  )
}

export default App;
