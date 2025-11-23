const DrivingConfigurationService = require("../services/DrivingConfigurationService");

class DrivingConfigurationController {
  async index(req, res, next) {
    try {
      const { id } = req.params;
      const config = await DrivingConfigurationService.getByVehicleId(id);
      res.json(config);
    } catch (error) {
      next(error);
    }
  }

  async active(req, res, next) {
    try {
      const { id } = req.params;
      const config = await DrivingConfigurationService.getActiveConfig(id);
      res.json(config);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id: vehicle_id, config_id } = req.params;
      const config = await DrivingConfigurationService.getByIdAndVehicleId(config_id, vehicle_id);
      res.json(config);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { id } = req.params;
      const { driver_id, gps_enabled, sampling_interval, sensor_ids } = req.body;

      const newConfig = await DrivingConfigurationService.createDrivingConfiguration({
        vehicle_id: id,
        driver_id,
        gps_enabled,
        sampling_interval,
        sensor_ids,
      });

      res.status(201).json({
        message: "Configuração de direção criada com sucesso!",
        configuration: newConfig,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DrivingConfigurationController();
