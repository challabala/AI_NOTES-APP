const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            
            // Allow bypassing DB lookup if we trust the token purely, 
            // but usually we want to attach user. For speed, we can just attach userId.
            // Let's attach full user but be mindful of performance.
            // const User = require('../models/User');
            // req.user = await User.findById(decoded.id).select('-passwordHash');
             
            // Simpler:
            req.user = { id: decoded.id };

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
