import Block from './Block.mjs'
import { createHash } from '../utilities/crypto-lib.mjs'


export default class Lirium {
    constructor() {
        this.chain = [Block.genesis]
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain.at(-1),
            data: data,
        })

        this.pendingTransactions = []
        this.chain.push(newBlock)
        return newBlock
    }


    getLastBlock() {
        return this.chain.at(-1);
    };

    replaceChain(chain) {
        if (chain.length <= this.chain.length) return
        if (!Lirium.isValidChain(chain)) return


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
            block.data,
            block.nonce,
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
}   
