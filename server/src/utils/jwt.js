import jwt from "jsonwebtoken";

const getSecret = (envVar, fallback) => {
  const secret = process.env[envVar];
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`CRITICAL: Environment variable ${envVar} must be defined in production.`);
    }
    return fallback;
  }
  return secret;
};

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, getSecret("JWT_SECRET", "dev_secret_access_key_12345"), {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, getSecret("JWT_REFRESH_SECRET", "dev_secret_refresh_key_12345"), {
    expiresIn: "7d",
  });
};
