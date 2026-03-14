const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Frontend-la irundhu vara token-a edukka
    const token = req.header('Authorization');
    
    // Token illana ulla vida koodadhu
    if (!token) return res.status(401).json({ message: "Access Denied! Token missing ❌" });

    try {
        // Token correct-a nu check pandradhu
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // User ID-ya save pannikrom
        next(); // Adutha velaiku anuppudhu
    } catch (err) {
        res.status(400).json({ message: "Invalid Token! ❌" });
    }
};

module.exports = verifyToken;