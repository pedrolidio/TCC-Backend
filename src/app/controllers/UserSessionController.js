const UserSessionService = require("../services/UserSessionService");

class UserSessionController {
  async create(req, res, next) {
    try {
      const { username, password } = req.body;
      const sessionData = await UserSessionService.createSession({ username, password });
      res.status(200).json({
        message: "Login realizado com sucesso!",
        ...sessionData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserSessionController();
