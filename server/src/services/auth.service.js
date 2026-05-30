import userRepository from '../repositories/user.repository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

class AuthService {
  async registerUser({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    const user = await userRepository.create({ name, email, password });
    
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    await userRepository.updateRefreshToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async loginUser({ email, password }) {
    const user = await userRepository.findByEmail(email, true);
    if (!user || !(await user.matchPassword(password))) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    await userRepository.updateRefreshToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
  }
}

export default new AuthService();
