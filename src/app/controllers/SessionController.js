const SessionService = require("../services/SessionService");

class SessionController {
  async create(req, res, next) {
    try {
      const { username, password } = req.body;
      const sessionData = await SessionService.createSession({ username, password });
      res.status(200).json({
        message: "Login realizado com sucesso!",
        ...sessionData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SessionController();
