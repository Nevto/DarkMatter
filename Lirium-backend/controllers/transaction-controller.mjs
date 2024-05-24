import { lirium } from "../server.mjs";

export const createTransaction = (req, res, next) => {
    const transaction = req.body;

    const blockIndex = lirium.createTransaction(transaction);
};