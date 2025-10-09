// middlewares/authenticate.js
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization")?.replace("Bearer ", "");
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach full user object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Optional admin check helper
export const isAdminValid = (req) => req.user?.type === "admin";
