import jwt from 'jsonwebtoken';
import User from '../models/UserModel.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';
import { asyncHandler } from './asyncHandler.mjs';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);

        if (!req.user) {
            return next(new ErrorResponse('Unauthorized', 401));
        }

        next();
    } catch (error) {
        return next(new ErrorResponse('Token probably not fine', 401));
    }
});


export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: `Rollen ${req.user ? req.user.role : 'who knows'} unauthorized`,
            });
        }
        next();
    };
};

