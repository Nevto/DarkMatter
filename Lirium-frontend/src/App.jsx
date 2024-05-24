<<<<<<< HEAD
import RouterProvider from 'react-router-dom';
import { router } from '../Router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
=======
import React, { useEffect, useState } from 'react'
import RetrieveLiriumBlocks from './components/getLiriumBlocks'

function App() {


  return (
    <>
      <div>
        <h1>Hej</h1>

        <RetrieveLiriumBlocks />
      </div>

>>>>>>> 787986cb678cf8cb25b3d92694930968e7804ea9
    </>
  );
}

export default App;
