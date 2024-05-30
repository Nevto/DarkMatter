import React, { useState } from 'react';
import { sendTransaction, mineBlock, getTransactionPool } from '../services/HttpClient';

const SendTransaction = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTransaction(sender, recipient, amount);
      console.log(response);
      window.alert('You successfully sent your transaction!');
      setSender('');
      setRecipient('');
      setAmount('');
      handlegetTransactionPool();
    } catch (error) {
      console.error(error);
      window.alert('Transaction failed. Please try again.');
    }
  };

  const handleMineBlock = async () => {
    try {
      const response = await mineBlock();
      console.log('Mining result:', response);
    } catch (error) {
      console.error('Error mining transactions:', error);
    }
  };

  return (
    <div className='sendTransactionWrapper'>
      <h1>Send a Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className='gap'>
          <label>Sender:</label>
          <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
        </div>
        <div className='gap'>
          <label>Recipient:</label>
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div className='gap'>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Add Transaction</button>
        <button onClick={handleMineBlock}>Mine Transactions</button>
      </form>
    </div>
  );
};

export default SendTransaction;