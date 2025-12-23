const SensorsService = require("../services/SensorsService");

class SensorsController {
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const data = await SensorsService.getVehicleSensors(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const id = req.userId;
      const { supported_obd_commands } = req.body;

      const result = await SensorsService.registerVehicleSensors(id, supported_obd_commands);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SensorsController();
