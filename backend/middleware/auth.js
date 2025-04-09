// middleware/auth.js
import jwt from 'jsonwebtoken'; // ✅ ESM style

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

export default verifyToken; // ✅ ESM default export

