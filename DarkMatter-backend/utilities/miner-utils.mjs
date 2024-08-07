import Transaction from "../models/Transaction.mjs";
// import TransactionPool from "../models/TransactionPool.mjs";

export const validateAndRewardTransactions = ({ transactionPool, wallet }) => {
    const validTransactions = transactionPool.validateTransactions();
    validTransactions.push(Transaction.rewardTransaction({ miner: wallet }));
    return validTransactions;
};

export const broadcastAndClearTransactions = ({ pubnubServer, transactionPool }) => {
    pubnubServer.broadcast();
    transactionPool.clearTransactions();
};