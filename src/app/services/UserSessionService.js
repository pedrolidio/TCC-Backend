const UserService = require("./UserService");
const TokenProvider = require("../providers/TokenProvider");
const bcrypt = require("bcrypt");

class UserSessionService {
  async createSession({ username, password }) {
    if (!username || !password) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    let user;

    try {
        user = await UserService.getUserByUsername(username);
    } catch (err) {
      if (err.message === "USER_NOT_FOUND") {
         const error = new Error("INVALID_CREDENTIALS");
         error.status = 401;
         throw error;
      }
      throw err;
    }

    const { password_hash, ...userData } = user;
    const password_matched = await bcrypt.compare(password, password_hash)
    
    if (!password_matched) {
      const error = new Error("INVALID_CREDENTIALS");
      error.status = 401;
      throw error;
    }

    const token = TokenProvider.generate({ 
      id: user.id,
      role_id: user.role_id
    });

    return { 
      user: userData,
      token
    };
  }
}

module.exports = new UserSessionService();
