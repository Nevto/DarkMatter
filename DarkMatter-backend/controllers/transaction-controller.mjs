import { transactionPool } from "../server.mjs";
import { wallet } from "../server.mjs";
import { darkMatter } from "../server.mjs";
import Miner from "../models/Miner.mjs";
import { pubnubServer } from "../server.mjs";
import { asyncHandler } from "../middleware/asyncHandler.mjs";
import TransactionModel from "../models/TransactionModel.mjs";


export const addTransaction = asyncHandler(async (req, res, next) => {
    const { amount, recipient } = req.body;

    let transaction = transactionPool.transactionExist({ address: wallet.publicKey });

    try {
        if (transaction) {
            transaction.update({ sender: wallet, recipient, amount });

            await TransactionModel.updateOne(
                { id: transaction.id },
                {
                    $set: {
                        input: transaction.inputMap,
                        outputMap: transaction.outputMap,
                        sender: wallet.publicKey,
                        recipient: recipient,
                        amount: amount,
                        timestamp: transaction.inputMap.timestamp
                    }
                }
            );
        } else {
            transaction = wallet.createTransaction({ recipient, amount });

            const transactionDoc = new TransactionModel({
                id: transaction.id,
                input: transaction.inputMap,
                outputMap: transaction.outputMap,
                sender: wallet.publicKey,
                recipient: recipient,
                amount: amount,
                timestamp: transaction.inputMap.timestamp
            });

            await transactionDoc.save();
        }
    } catch (error) {
        return res.status(400).json({ success: false, statusCode: 400, message: error.message });
    }

    transactionPool.addTransaction(transaction);
    pubnubServer.broadcastTransaction(transaction);

    res.status(201).json({ success: true, statusCode: 201, data: transaction });
});

export const getTransactionPool = (req, res, next) => {
    res.status(200).json({ success: true, statusCode: 200, data: transactionPool.transactionMap });
};

export const mineTransactions = asyncHandler(async (req, res, next) => {
    const miner = new Miner({ darkMatter, transactionPool, wallet, pubnubServer });

    try {
        miner.mineTransaction();
    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, message: error.message });
    }

    res.status(200).json({ success: true, statusCode: 200, data: "Block has been mined and added to the blockchain" });
});
