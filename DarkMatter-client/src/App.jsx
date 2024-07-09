import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import LogInForm from './components/LogInForm';
import { UserProvider } from './useContext';
import { MineBlock } from './components/MineBlock';
import { SendTransaction } from './components/SendTransaction';
import { GetDarkMatter } from './components/DarkMatter';
import RegisterForm from './components/Register';

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(prevState => !prevState);
  };

  return (
    <div>

      <UserProvider>
        <Header onLoginClick={handleLoginClick} />
        {showLoginForm && <LogInForm />}
        <RegisterForm />
      </UserProvider>
      <SendTransaction />
      <MineBlock />
      <GetDarkMatter />
    </div>
  );
};

export default App;