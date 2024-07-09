import { describe, test, expect, beforeEach } from 'vitest'
import { validateTransaction } from '../utilities/transaction-utils.mjs';
import Wallet from '../models/Wallet.mjs';
import Transaction from '../models/Transaction.mjs';



describe('Transaction Utilities', () => {
    let sender, recipient, amount, transaction;

    beforeEach(() => {
        sender = new Wallet()
        recipient = 'recipient-public-key'
        amount = 50
        transaction = new Transaction({ sender, recipient, amount })
    })

    test('creates an output map with the correct attributes', () => {
        const expectedOutPutMap = {
            [sender.publicKey]: sender.balance - amount,
            [recipient]: amount
        }

        expect(transaction.outputMap).toEqual(expectedOutPutMap)
    })

    test('creates an input map with the correct attributes', () => {
        const expectedInputMap = {
            timestamp: expect.any(Number),
            amount: sender.balance,
            address: sender.publicKey,
            signature: expect.any(Object)
        }

        expect(transaction.inputMap).toEqual(expectedInputMap)
    })

    test('validates a transaction', () => {
        const isValid = validateTransaction({
            inputMap: transaction.inputMap,
            outputMap: transaction.outputMap,

        })
        expect(isValid).toBe(true)
    })

    test('invalidates a transaction with mismatched amount', () => {
        transaction.outputMap[sender.publicKey] += 40;

        const isValid = validateTransaction({ inputMap: transaction.inputMap, outputMap: transaction.outputMap })
        expect(isValid).toBe(false)
    });

    test('invalidates a transaction with incorrect signature', () => {

        transaction.inputMap.signature = { r: 'invalid_r_value', s: 'invalid_s_value' }

        const isValid = validateTransaction({
            inputMap: transaction.inputMap,
            outputMap: transaction.outputMap,
        });

        expect(isValid).toBe(false)
    });
})