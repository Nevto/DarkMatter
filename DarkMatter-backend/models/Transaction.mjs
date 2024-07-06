import { v4 as uuidv4 } from 'uuid';
import { REWARD_ADDRESS, MINING_REWARD } from '../config/settings.mjs';
import { createOutputMap, createInputMap, validateTransaction } from '../utilities/transaction-utils.mjs';

export default class Transaction {
    constructor({ sender, recipient, amount, inputMap, outputMap }) {
        this.id = uuidv4().replace(/-/g, '');
        this.outputMap = outputMap || createOutputMap({ sender, recipient, amount });
        this.inputMap = inputMap || createInputMap({ sender, outputMap: this.outputMap });
    }

    static rewardTransaction({ miner }) {
        return new this({
            inputMap: REWARD_ADDRESS,
            outputMap: { [miner.publicKey]: MINING_REWARD },
        });
    }

    static validate(transaction) {
        return validateTransaction(transaction);
    }

    update({ sender, recipient, amount }) {
        if (amount > this.outputMap[sender.publicKey]) {
            throw new Error('Insufficient funds!');
        }

        if (!this.outputMap[recipient]) {
            this.outputMap[recipient] = amount;
        } else {
            this.outputMap[recipient] += amount;
        }

        this.outputMap[sender.publicKey] -= amount;
        this.inputMap = createInputMap({ sender, outputMap: this.outputMap });
    }
}

