import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}


const generateRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );

}


const verifyAccessToken = (token) => {

    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

}

const verifyRefreshToken = (token) => {

    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );

}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}