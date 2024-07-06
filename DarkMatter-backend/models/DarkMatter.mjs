import Block from './Block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import BlockModel from '../models/BlockModel.mjs';

export default class DarkMatter {
    constructor() {
        this.chain = [Block.genesis];
    }

    async addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain.at(-1),
            data: data,
        });

        this.chain.push(newBlock);

        await this.saveBlock(newBlock);

        return newBlock;
    }

    getLastBlock() {
        return this.chain.at(-1);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) return;
        if (!DarkMatter.isValidChain(chain)) return;

        this.chain = chain;
    }

    static isValidChain(chain) {
        if (!this.isValidGenesis(chain[0])) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const previousBlock = chain[i - 1];

            if (
                !this.isValidHash(block, previousBlock) ||
                !this.isValidDifficulty(block, previousBlock)
            ) {
                return false;
            }
        }

        return true;
    }

    static isValidGenesis(block) {
        return JSON.stringify(block) === JSON.stringify(Block.genesis);
    }

    static isValidHash(block, previousBlock) {
        const validHash = createHash(
            block.timestamp,
            block.lastHash,
            block.nonce,
            block.data,
            block.difficulty,
            block.blockIndex
        );
        return block.hash === validHash && block.lastHash === previousBlock.hash;
    }

    static isValidDifficulty(block, previousBlock, minDifficulty = 1) {
        if (block.difficulty < minDifficulty) return false;
        if (previousBlock.difficulty - block.difficulty > 1) return false;

        return Math.abs(previousBlock.difficulty - block.difficulty) <= 1;
    }

    async saveBlock(block) {
        const blockDoc = new BlockModel(block);
        await blockDoc.save();
    }

    async loadBlockchain() {
        const blocks = await BlockModel.find().sort({ blockIndex: 1 });
        this.chain = blocks.map(block => ({
            timestamp: block.timestamp,
            lastHash: block.lastHash,
            hash: block.hash,
            data: block.data,
            nonce: block.nonce,
            difficulty: block.difficulty,
            blockIndex: block.blockIndex
        }));
    }
}
