const jwt = require('jsonwebtoken')


exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;;
    console.log(req)
    if (!token) {
        return res.status(403).json({ success: false, message: 'Token not provided' });
    }
    jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};
