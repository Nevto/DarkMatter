import React, { useEffect, useState } from 'react'
import RetrieveLiriumBlocks from './components/getLiriumBlocks'
import './styles/main.scss'

function App() {


  return (
    <>
      <div>
        <h1>Lirium Protocol</h1>

        <RetrieveLiriumBlocks />
      </div>

    </>
  )
}

export default App
