import { createHash } from '../utilities/crypto-lib.mjs';
import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import hexToBinary from 'hex-to-binary';

export default class Block {
  constructor({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
    blockIndex,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.blockIndex = blockIndex;
  }

  static get genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;

    let { difficulty } = lastBlock;
    let hash, timestamp;
    let nonce = 0;
    let blockIndex = lastBlock.blockIndex + 1;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficultyLevel({ block: lastBlock, timestamp });
      hash = createHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty,
        blockIndex
      );
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    );

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
      blockIndex,
    });
  }

  static adjustDifficultyLevel({ block, timestamp }) {
    const { difficulty } = block;

    if (timestamp - block.timestamp > MINE_RATE) {
      return Math.max(difficulty - 1, 1)
    }

    return difficulty + 1;
  }
}
