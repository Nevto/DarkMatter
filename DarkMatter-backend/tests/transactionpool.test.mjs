import { describe, test, expect, beforeEach } from 'vitest'
import TransactionPool from '../models/TransactionPool.mjs'
import Wallet from '../models/Wallet.mjs'
import Transaction from '../models/Transaction.mjs'

describe('TransactionPool', () => {
    let transactionPool, transaction1, transaction2, wallet

    beforeEach(() => {
        transactionPool = new TransactionPool()
        wallet = new Wallet()
        transaction1 = new Transaction({
            sender: wallet,
            recipient: 'recipient1-public-key',
            amount: 50
        });
        transaction2 = new Transaction({
            sender: wallet,
            recipient: 'recipient2-public-key',
            amount: 75
        });
    });

    test('adds a transaction to the pool', () => {
        transactionPool.addTransaction(transaction1)
        expect(transactionPool.transactionMap[transaction1.id]).toBe(transaction1)
    });

    test('clears transactions from the pool', () => {
        transactionPool.addTransaction(transaction1)
        transactionPool.clearTransactions()
        expect(Object.keys(transactionPool.transactionMap).length).toBe(0)
    });

    test('replaces transaction map in the pool', () => {
        const newTransactionMap = {
            'transaction-id-1': transaction1,
            'transaction-id-2': transaction2
        };
        transactionPool.replaceTransactionMap(newTransactionMap)
        expect(transactionPool.transactionMap).toEqual(newTransactionMap)
    });

    test('checks if a transaction exists in the pool', () => {
        transactionPool.addTransaction(transaction1)
        const existingTransaction = transactionPool.transactionExist({ address: wallet.publicKey })
        expect(existingTransaction).toBe(transaction1)
    });

    test('validates transactions in the pool', () => {
        transactionPool.addTransaction(transaction1);
        transactionPool.addTransaction(transaction2);

        const validTransactions = transactionPool.validateTransactions()
        expect(validTransactions).toEqual([transaction1, transaction2])
    })
})
