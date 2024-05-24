import React, { useEffect, useState } from 'react'
import RetrieveLiriumBlocks from './components/getLiriumBlocks'

function App() {
  const [liriumBlocks, setLiriumBlocks] = useState([])

  const loadLiriumBlocks = (blocks) => {
    setLiriumBlocks(blocks)
  }


  return (
    <>
      <div>
        <h1>Hej</h1>

        <RetrieveLiriumBlocks loadLiriumBlocks={loadLiriumBlocks} />
        <pre>{JSON.stringify(liriumBlocks, null, 2)}</pre>
      </div>

    </>
  )
}

export default App
