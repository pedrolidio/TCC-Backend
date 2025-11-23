const SensorsDataService = require("../services/SensorsDataService");

class SensorsDataController {
  async show(req, res, next) {
    try {
      const { driving_configuration_id } = req.query;

      const data = await SensorsDataService.getByDrivingConfigurationId(driving_configuration_id);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const storedData = await SensorsDataService.create(req.body);

      return res.status(201).json(storedData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SensorsDataController();
