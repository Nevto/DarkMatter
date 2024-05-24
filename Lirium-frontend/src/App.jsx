import RetrieveLiriumBlocks from './components/getLiriumBlocks'
import './styles/main.scss'
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../Router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
