const SensorsRepository = require("../repositories/SensorsRepository");
const OBDCommandMap = require("../models/OBDCommandMap");
const VehicleService = require("./VehicleService");

class SensorsService {
  async getVehicleSensors(vehicleId) {
    await VehicleService.getVehicleById(vehicleId);

    const supportedCommands = await SensorsRepository.getSupportedCommandsByVehicle(vehicleId);
    if (supportedCommands.length === 0) {
      const error = new Error("SENSORS_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    return {
      vehicle_id: vehicleId,
      supported_obd_commands: supportedCommands,
    };
  }

  async registerVehicleSensors(vehicleId, supported_obd_commands) {
    if (!Array.isArray(supported_obd_commands)) {
      const error = new Error("INVALID_COMMANDS_ARRAY");
      error.status = 400;
      throw error;
    }

    const vehicle = await VehicleService.getVehicleById(vehicleId);

    const mappedCommands = supported_obd_commands
      .filter(cmd => OBDCommandMap.hasOwnProperty(cmd))
      .map(cmd => OBDCommandMap[cmd]);

    if (mappedCommands.length === 0) {
      const error = new Error("NO_VALID_OBD_COMMANDS");
      error.status = 400;
      throw error;
    }

    const obdCommands = await SensorsRepository.getOBDCommandsByNames(mappedCommands);
    const commandIds = obdCommands.map(obd => obd.id);

    if (commandIds.length === 0) {
      const error = new Error("OBD_COMMANDS_NOT_FOUND_IN_DB");
      error.status = 404;
      throw error;
    };

    try {
      await SensorsRepository.insertSupportedCommands(vehicleId, commandIds);
    } catch (error) {
      if (error.message && error.message.includes("UNIQUE constraint failed")) {
        const err = new Error("SENSORS_ALREADY_REGISTERED");
        err.status = 409;
        throw err;
      }
      throw error;
    }

    return { vehicle, commands: mappedCommands };
  }
}

module.exports = new SensorsService();
