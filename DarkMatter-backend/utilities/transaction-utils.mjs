import { verifySignature } from '../utilities/crypto-lib.mjs';

export const createOutputMap = ({ sender, recipient, amount }) => {
    const outputMap = {};
    outputMap[recipient] = amount;
    outputMap[sender.publicKey] = sender.balance - amount;
    return outputMap;
};

export const createInputMap = ({ sender, outputMap }) => ({
    timestamp: Date.now(),
    amount: sender.balance,
    address: sender.publicKey,
    signature: sender.sign(outputMap),
});

export const validateTransaction = ({ inputMap, outputMap }) => {
    const { address, amount, signature } = inputMap;
    const outputTotal = Object.values(outputMap).reduce((total, amount) => total + amount);

    if (amount !== outputTotal) {
        return false;
    }

    return verifySignature({ publicKey: address, data: outputMap, signature });
};
