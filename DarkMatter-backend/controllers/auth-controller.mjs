import { asyncHandler } from "../middleware/asyncHandler.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import User from "../models/UserModel.mjs";
import { createAndSendToken } from "../utilities/auth-utils.mjs";


export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    createAndSendToken(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Missing email or password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Something went terribly wrong', 401));
    }

    const isCorrect = await user.validatePassword(password);

    if (!isCorrect) {
        return next(new ErrorResponse('Something went terribly wrong', 401));
    }

    createAndSendToken(user, 200, res);
});

export const logout = asyncHandler(async (req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/',
        domain: 'localhost',
    });
    res.status(200).json({ success: true, statusCode: 200, message: 'logged out' });
})



