// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const adminAuth = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token)
//     return res.status(401).json({ success: false, message: "Access Denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin")
//       return res.status(403).json({ success: false, message: "Not authorized as admin" });

//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// export default adminAuth;
import jwt from 'jsonwebtoken';

const adminauth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Authorization token required" 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false,
                message: "Invalid or expired token" 
            });
        }
        req.user = user;
        next();
    });
};

export default adminauth;