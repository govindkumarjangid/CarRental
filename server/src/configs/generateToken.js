import jwt from 'jsonwebtoken';

export const generateToken = (res, id, role) => {
    const token = jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const isLocalhost = process.env.NODE_ENV === 'development' || !process.env.FRONTEND_URL;

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: !isLocalhost,
        sameSite: isLocalhost ? 'lax' : 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
