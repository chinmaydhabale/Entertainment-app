const jwt = require('jsonwebtoken')

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;;
    if (!token) {
        return res.json({ success: false, message: 'Token not provided' });
    }
    jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};
