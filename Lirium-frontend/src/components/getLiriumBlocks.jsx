import { getLiriumBlocks } from '../services/HttpClient';
import { useState } from 'react';

const RetrieveLiriumBlocks = () => {
  const [liriumBlocks, setLiriumBlocks] = useState([]);

  const handleLoadLiriumBlocks = async () => {
    const blocks = await getLiriumBlocks();
    setLiriumBlocks(blocks.data);
  };

  return (
    <div className='theWrapper'>
      <div className='buttonWrapper'>
        <h2 className='insideText'>Are you ready?</h2>
        <h3 className='insideText'>take a look at Lirium Protocols fully secure and immutable blocks</h3>
        <h4 className='insideText'>Get liriumfied</h4>
        <button className='insideText' onClick={handleLoadLiriumBlocks}>
          {' '}
          Retrieve Blockchain Data
        </button>
      </div>
      <div className='blockchainWrapper'>
        <ul>
          {liriumBlocks.map((block, index) => (
            <li key={index} className='block-Container'>
              Timestamp: {block.timestamp}
              <br />
              Last Hash: {block.lastHash}
              <br />
              Hash: {block.hash}
              <br />
              Data: {JSON.stringify(block.data)}
              <br />
              Nonce: {block.nonce}
              <br />
              Difficulty: {block.difficulty}
              <br />
              Block Index: {block.blockIndex}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default RetrieveLiriumBlocks;
