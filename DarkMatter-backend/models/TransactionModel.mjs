import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    input: { type: Object, required: true },
    outputMap: { type: Object, required: true },
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
