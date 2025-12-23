const SensorsDataRepository = require("../repositories/SensorsDataRepository");
const DrivingConfigurationService = require("./DrivingConfigurationService");

class SensorsDataService {
  async getByDrivingConfigurationIdAndVehicleId(drivingConfigurationId, vehicleId) {
    if (!drivingConfigurationId) {
      const error = new Error("MISSING_CONFIG_ID_PARAM");
      error.status = 400;
      throw error;
    }

    const config = await DrivingConfigurationService.getByIdAndVehicleId(drivingConfigurationId, vehicleId);
    const { vehicle_id, start_date, end_date } = config;

    return await SensorsDataRepository.findByVehicleAndDateRange(
      vehicle_id,
      start_date,
      end_date
    );
  }

  _validateAndTransformData(vehicle_id, sensorData, activeConfig) {
    const { sensors: expectedSensors, include_gps: gpsExpected } = activeConfig;
    
    const processedData = {
      vehicle_id,
      timestamp: new Date(sensorData.timestamp),
    };

    if (gpsExpected) {
      if (sensorData.latitude === undefined || sensorData.longitude === undefined || sensorData.latitude === null || sensorData.longitude === null) {
        const error = new Error("MISSING_GPS_DATA");
        error.status = 400;
        throw error;
      }
      processedData.latitude = sensorData.latitude;
      processedData.longitude = sensorData.longitude;
    } else {
      if (sensorData.latitude !== undefined || sensorData.longitude !== undefined) {
        const error = new Error("EXTRA_GPS_DATA");
        error.status = 400;
        throw error;
      }
    }

    const expectedSensorSet = new Set(expectedSensors);

    const knownRootFields = new Set(["vehicle_id", "timestamp", "latitude", "longitude"]);
    const receivedSensorNames = Object.keys(sensorData).filter(
      key => !knownRootFields.has(key)
    );

    for (const receivedName of receivedSensorNames) {
      if (!expectedSensorSet.has(receivedName)) {
        const error = new Error("EXTRA_SENSOR_DATA");
        error.status = 400;
        throw error;
      }
    }

    for (const sensorName of expectedSensors) {
      if (sensorData[sensorName] === undefined || sensorData[sensorName] === null) {
        const error = new Error("MISSING_SENSOR_DATA");
        error.status = 400;
        throw error;
      }
      processedData[sensorName] = sensorData[sensorName];
    }

    return processedData;
  }

  async create(vehicle_id, sensorData) {
    if (!vehicle_id || !sensorData.timestamp) {
      const error = new Error("MISSING_DATA_BODY_FIELDS");
      error.status = 400;
      throw error;
    }

    let activeConfig;

    try {
      activeConfig = await DrivingConfigurationService.getActiveConfig(vehicle_id);
    } catch (error) {
      if (error.status === 404 && error.message === "NO_ACTIVE_CONFIG") {
        const validationError = new Error("NO_ACTIVE_CONFIG_FOR_VEHICLE");
        validationError.status = 400; 
        throw validationError;
      }
      throw error;
    }

    const processedData = this._validateAndTransformData(vehicle_id, sensorData, activeConfig);

    return await SensorsDataRepository.create(processedData);
  }
}

module.exports = new SensorsDataService();
