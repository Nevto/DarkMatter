import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now, },
    lastHash: { type: String, required: true, },
    hash: { type: String, required: true, },
    data: { type: mongoose.Schema.Types.Mixed, required: true, },
    nonce: { type: Number, required: true, },
    difficulty: { type: Number, required: true, },
    blockIndex: { type: Number, required: true, },
});

const Block = mongoose.model('Block', blockSchema);

export default Block;
