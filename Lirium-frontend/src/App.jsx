import React, { useEffect, useState } from 'react'
import RetrieveLiriumBlocks from './components/getLiriumBlocks'
import './styles/main.scss'
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../Router';

function App() {
  return (
    <>
      <div>
        <h1>Lirium Protocol</h1>

        <RetrieveLiriumBlocks />
      </div>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
