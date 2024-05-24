import React, { useState } from 'react';
import { sendTransaction } from '../services/HttpClient';

const SendTransaction = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTransaction(sender, recipient, amount);
      console.log('Transaction sent:', response);
      setSender('');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <h1>Send a Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sender:</label>
          <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
        </div>
        <div>
          <label>Recipient:</label>
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Send Transaction</button>
      </form>
    </div>
  );
};

export default SendTransaction;