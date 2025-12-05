const jwt = require("jsonwebtoken");
const env = require("../../config/env");

class TokenProvider {
  generate(payload) {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });
  }

  verify(token) {
    return jwt.verify(token, env.jwt.secret);
  }
}

module.exports = new TokenProvider();