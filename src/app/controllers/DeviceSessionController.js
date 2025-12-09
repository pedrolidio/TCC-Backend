const DeviceSessionService = require("../services/DeviceSessionService");

class DeviceSessionController {
  async create(req, res, next) {
    try {
      const { vin, secret } = req.body;
      const sessionData = await DeviceSessionService.createSession({ vin, secret });
      res.status(200).json({
        message: "Login realizado com sucesso!",
        ...sessionData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeviceSessionController();
