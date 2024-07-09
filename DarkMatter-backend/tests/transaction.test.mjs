import { describe, test, expect, beforeEach } from 'vitest'
import { createInputMap, createOutputMap, validateTransaction } from '../utilities/transaction-utils.mjs';



describe('Transaction Utilities', () => {
    let sender, recipient, amount, outputMap, inputMap;

    beforeEach(() => {
        sender = { publicKey: 'sender-public-key', balance: 1000, sign: () => 'signature' }
        recipient = 'recipient-public-key'
        amount = 50
        outputMap = createOutputMap({ sender, recipient, amount })
        inputMap = createInputMap({ sender, outputMap })
    })

    test('creates an output map', () => {
        expect(outputMap).toEqual({
            [recipient]: amount,
            [sender.publicKey]: sender.balance - amount,
        })
    })

    test('creates an input map', () => {
        expect(inputMap).toEqual({
            timestamp: expect.any(Number),
            amount: sender.balance,
            address: sender.publicKey,
            signature: 'signature',
        })
    })

    test('validates a transaction', () => {
        const isValid = validateTransaction({ inputMap, outputMap })
        expect(isValid).toBe(false)
    })

    // test('invalidates a transaction with mismatched amount', () => {
    //     outputMap[sender.publicKey] += 40
    //     const isValid = validateTransaction({ inputMap, outputMap })
    //     expect(isValid).toBe(false)
    // })
})