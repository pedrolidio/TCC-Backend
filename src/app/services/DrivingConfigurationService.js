const DrivingConfigurationRepository = require("../repositories/DrivingConfigurationRepository");
const VehicleService = require("./VehicleService");

class DrivingConfigurationService {
  async getActiveConfig(vehicleId) {
    await VehicleService.getVehicleById(vehicleId);

    const config = await DrivingConfigurationRepository.findActiveConfigByVehicle(vehicleId);
    if (!config) {
      const error = new Error("NO_ACTIVE_CONFIG");
      error.status = 404;
      throw error;
    }

    const configSensors = await DrivingConfigurationRepository.findSensorsByConfig(config.id);
    const sensors = configSensors.map(s => s.command);

    return {
      id: config.id,
      sensors,
      include_gps: config.gps_enabled,
      sample_interval: config.sampling_interval,
      last_updated: config.start_date,
    };
  }

  async createDrivingConfiguration({ vehicle_id, driver_id, gps_enabled, sampling_interval, sensor_ids }) {
    if (!vehicle_id || !driver_id || gps_enabled === undefined || !sampling_interval || !sensor_ids) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    await VehicleService.getVehicleById(vehicle_id);

    const now = new Date().toISOString();

    let configuration_id
    
    try {
      configuration_id = await DrivingConfigurationRepository.createConfig(
        {
          driver_id,
          vehicle_id,
          start_date: now,
          gps_enabled,
          sampling_interval,
        },
        sensor_ids
      );
    } catch(error) {
      if (error.message && error.message.includes("Comando não suportado para este veículo")) {
        const err = new Error("UNSUPPORTED_SENSOR_FOR_VEHICLE");
        err.status = 409;
        throw err;
      }
      throw error;
    }
    
    return {
      configuration_id,
      driver_id,
      vehicle_id,
      start_date: now,
      gps_enabled,
      sampling_interval,
      sensors: sensor_ids,
    };
  }

  async getById(id) {
    const config = await DrivingConfigurationRepository.findById(id);
    
    if (!config) {
      const error = new Error("CONFIG_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    return config;
  }

  async getByVehicleId(id) {
    const configs = await DrivingConfigurationRepository.findByVehicleId(id);
    
    if (!configs || configs.length === 0) {
      const error = new Error("VEHICLE_CONFIGS_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    const configIds = configs.map(c => c.id);

    const allSensors = await DrivingConfigurationRepository.findSensorsByConfigIds(configIds);

    const sensorMap = new Map();

    allSensors.forEach(sensor => {
      if (!sensorMap.has(sensor.configuration_id)) {
        sensorMap.set(sensor.configuration_id, []);
      }
      sensorMap.get(sensor.configuration_id).push(sensor.command);
    });

    const formattedConfigs = configs.map(config => {
      const sensors = sensorMap.get(config.id) || [];

      return {
        id: config.id,
        driver_id: config.driver_id,
        vehicle_id: config.vehicle_id,
        start_date: config.start_date,
        end_date: config.end_date,
        include_gps: config.gps_enabled,
        sample_interval: config.sampling_interval,
        sensors: sensors,
      };
    });

    return formattedConfigs;
  }
}

module.exports = new DrivingConfigurationService();
