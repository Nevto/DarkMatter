import { lirium } from "../server.mjs";
import { pubnubServer } from "../server.mjs";

export const createTransaction = (req, res, next) => {
    const { amount, sender, recipient } = req.body;

    const transaction = lirium.createTransaction({ amount, sender, recipient });

    const index = lirium.addTransaction(transaction);

    pubnubServer.broadcast(transaction);

    res.status(201).json({ success: true, statusCode: 201, data: { message: "Transaction created ( test pub)", transaction, index } });
};

// export const broadcastTransaction = (req, res, next) => {
// const { amount, sender, recipient } = req.body;

// const transaction = lirium.createTransaction({ amount, sender, recipient });

//     const index = lirium.addTransaction(transaction);


//     res.status(201).json({ success: true, statusCode: 201, data: { message: "Transaction created and broadcasted", transaction, index } });

// };