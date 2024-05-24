import { getLiriumBlocks } from '../services/HttpClient';
import { useState } from 'react';

const RetrieveLiriumBlocks = () => {
  const [liriumBlocks, setLiriumBlocks] = useState([]);

  const handleLoadLiriumBlocks = async () => {
    const blocks = await getLiriumBlocks();
    setLiriumBlocks(blocks.data);
  };

  return (
    <div>
      <button onClick={handleLoadLiriumBlocks}>
        {' '}
        Retrieve Blockchain Data
      </button>
      <ul>
        {liriumBlocks.map((block, index) => (
          <li key={index}>
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
  );
};

export default RetrieveLiriumBlocks;
