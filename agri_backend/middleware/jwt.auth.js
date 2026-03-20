const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
            req.user = user;
            next();
        });
    },

    generateToken: (params) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            id: params._id,
            name: params.name
        }
        let expireTime = { expiresIn: '1d' }
        const token = jwt.sign(data, jwtSecretKey, expireTime);
        return token;
    },
}