import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL: JWT_SECRET environment variable is not defined.");
    }
    return "dev_secret_access_key_12345";
  }
  return secret;
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: { message: "Not authorized, no token" } });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, error: { message: "Not authorized, user not found" } });
    }
    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, error: { message: "Not authorized, token failed" } });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { message: `User role ${req.user?.role || "unknown"} is not authorized` },
      });
    }
    next();
  };
};
