import User from '../models/User.js';

class UserRepository {
  async findByEmail(email, includePassword = false) {
    if (includePassword) {
      return await User.findOne({ email }).select('+password');
    }
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async updateRefreshToken(id, token) {
    return await User.findByIdAndUpdate(id, { refreshToken: token });
  }
}

export default new UserRepository();
