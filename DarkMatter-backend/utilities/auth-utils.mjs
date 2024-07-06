export const createAndSendToken = (user, statusCode, res) => {
    const token = user.generateToken();
    res.cookie('token', token,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            path: '/',
            domain: 'localhost',
        }
    )

    res.status(statusCode).json({ success: true, statusCode, token });
}