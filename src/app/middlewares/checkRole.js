function checkRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.userRole) {
      const error = new Error("ACCESS_DENIED");
      error.status = 401;
      return next(error);
    }

    if (!allowedRoles.includes(req.userRole)) {
      const error = new Error("FORBIDDEN");
      error.status = 403;
      return next(error);
    }

    return next();
  };
};

module.exports = checkRole;