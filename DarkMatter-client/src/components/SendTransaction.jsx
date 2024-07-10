import { useState } from "react";
import { sendTransaction } from "../services/HttpClient";

export const SendTransaction = () => {
    const [recipient, setRecipient] = useState('')
    const [sender, setSender] = useState('')
    const [amount, setAmount] = useState(0)

    const handleTransactionClick = async () => {
        try {
            await sendTransaction(recipient, sender, amount);
            console.log('Transaction sent successfully');

        } catch (error) {
            console.error('Error sending transaction', error);
        }
    }

    return (
        <>
            <h2>Send a transaction</h2>
            <form className="registerForm">
                <input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Sender"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </form>
            <button className='loginButton' onClick={handleTransactionClick}>Send</button>
        </>
    )
}