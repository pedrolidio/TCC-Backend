const TokenProvider = require("../providers/TokenProvider");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error("TOKEN_NOT_PROVIDED");
    error.status = 401;
    return next(error);
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
    const error = new Error("TOKEN_MALFORMATTED");
    error.status = 401;
    return next(error);
  }

  const [scheme, token] = parts;

  try {
    const decoded = TokenProvider.verify(token);

    req.userId = decoded.id;
    req.userRole = decoded.role_id;

    return next();
  } catch (err) {
    const error = new Error("INVALID_TOKEN");
    error.status = 401;
    return next(error);
  }
};

module.exports = auth;
