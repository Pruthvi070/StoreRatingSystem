const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Invalid user data in token." });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
const authorizeStoreOwner = (req, res, next) => {
    if (!req.user || req.user.role !== "store_owner") {
        return res.status(403).json({ message: "Access denied. Only store owners can perform this action." });
    }
    next();
};
module.exports = { protect, adminOnly,authorizeStoreOwner };

// const adminOnly = (req, res, next) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied. Admins only." });
//     }
//     next();
// };