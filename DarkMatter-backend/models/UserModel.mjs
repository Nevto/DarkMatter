import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Email is required'], },
    email: {
        type: String, required: [true, 'Email is required'],
        unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid',],
    },
    role: { type: String, enum: ['user', 'manager'], default: 'user', },
    password: { type: String, required: [true, 'Password is missing'], minlength: 6, select: false, },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { return next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.validatePassword = async function (passwordToCheck) {
    return await bcrypt.compare(passwordToCheck, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TTL,
    })
}


export default mongoose.model('User', userSchema)
