import React, { useState } from "react";
import { sendTransaction } from "../services/HttpClient";

export const SendTransaction = () => {
    const [recipient, setRecipient] = useState('');
    const [sender, setSender] = useState('');
    const [amount, setAmount] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    const handleTransactionClick = async () => {
        try {
            await sendTransaction(sender, recipient, amount);
            setSuccessMessage('Transaction sent successfully, wp you are now a crypto millionaire!')

        } catch (error) {
            console.error('Error sending transaction', error);
            setError('Error sending transaction, please try again');
        }
    };

    const resetTransactionForm = () => {
        setSender('');
        setRecipient('');
        setAmount(0)
    };

    const onHandleFormSubmit = async (e) => {
        e.preventDefault()
        await handleTransactionClick();
        resetTransactionForm();
    };

    return (
        <>
            <h2>Send a transaction</h2>
            <form className="registerForm transactionForm" onSubmit={onHandleFormSubmit}>
                <input
                    type="text"
                    placeholder="Sender"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />
                <button className='loginButton transactionForm' type="submit">Send</button>
            </form>
            {successMessage && <p style={{ color: 'white' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}
