import authService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';
import { generateAccessToken } from '../utils/jwt.js';

const setTokenCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.registerUser({ name, email, password });
    
    setTokenCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      const error = new Error('Please provide email and password');
      error.statusCode = 400;
      throw error;
    }

    const { user, accessToken, refreshToken } = await authService.loginUser({ email, password });
    
    setTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      const error = new Error('Not authorized, no token');
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refreshsecret123');
    const user = await userRepository.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      const error = new Error('Not authorized, token failed');
      error.statusCode = 401;
      throw error;
    }

    const newAccessToken = generateAccessToken(user._id);
    res.status(200).json({ success: true, data: { accessToken: newAccessToken } });
  } catch (error) {
    next(error);
  }
};
