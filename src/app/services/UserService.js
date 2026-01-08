const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const roles = require("../../config/roles");

class UserService {
  async getAllUsers() {
    return UserRepository.findAll();
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      const error = new Error("USER_NOT_FOUND");
      error.status = 404;
      throw error;
    }
    return user;
  }

  async getUserByUsername(username) {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      const error = new Error("USER_NOT_FOUND");
      error.status = 404;
      throw error;
    }
    return user;
  }

  async createUser({ username, password }) {
    if (!username || !password) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    if (password.length < 8) {
      const error = new Error("PASSWORD_TOO_SHORT");
      error.status = 400; 
      throw error;
    }

    const existing = await UserRepository.findByUsername(username);
    if (existing) {
      const error = new Error("DUPLICATE_USERNAME");
      error.status = 409;
      throw error;
    }

    const role_id = roles.MONITOR;
    const password_hash = await bcrypt.hash(password, 12);

    return UserRepository.create({ username, password_hash, role_id });
  }

  async updateUserRole(id, roleId) {
    if (!roleId) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    if (parseInt(id) === 1) {
      const error = new Error("ROOT_USER_IMMUTABLE");
      error.status = 403;
      throw error;
    }

    const validRoles = [roles.ADMIN, roles.MANAGER, roles.MONITOR];

    if (!validRoles.includes(roleId)) {
      const error = new Error("INVALID_ROLE");
      error.status = 400;
      throw error;
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      const error = new Error("USER_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    return UserRepository.update(id, { role_id: roleId });
  }
}

module.exports = new UserService();
