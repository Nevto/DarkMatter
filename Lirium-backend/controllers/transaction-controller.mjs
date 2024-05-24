import { lirium } from "../server.mjs";
import { pubnubServer } from "../server.mjs";

export const createTransaction = (req, res, next) => {
    const transaction = req.body;

    const index = lirium.addTransaction(transaction);

    res.status(201).json({ success: true, statusCode: 201, data: { message: "Transaction created", transaction, index } });
};

export const broadcastTransaction = (req, res, next) => {
    const transaction = lirium.createTransaction(
        req.body.amount,
        req.body.sender,
        req.body.recipient,
        req.body.transactionId
    );

    const index = lirium.addTransaction(transaction);

    pubnubServer.broadcast(transaction);

    res.status(201).json({ success: true, statusCode: 201, data: { message: "Transaction created and broadcasted", transaction, index } });

};