const VehicleService = require("./VehicleService");
const TokenProvider = require("../providers/TokenProvider");
const bcrypt = require("bcrypt");
const roles = require("../../config/roles");

class DeviceSessionService {
  async createSession({ vin, secret }) {
    if (!vin || !secret) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    let vehicle;

    try {
        vehicle = await VehicleService.getVehicleByVin(vin);
    } catch (err) {
      if (err.message === "VEHICLE_NOT_FOUND") {
         const error = new Error("INVALID_CREDENTIALS");
         error.status = 401;
         throw error;
      }
      throw err;
    }

    const { secret_hash, ...vehicleData } = vehicle;
    const secret_matched = await bcrypt.compare(secret, secret_hash)
    
    if (!secret_matched) {
      const error = new Error("INVALID_CREDENTIALS");
      error.status = 401;
      throw error;
    }

    const token = TokenProvider.generate({ 
      id: vehicle.id,
      role_id: roles.VEHICLE
    });

    return { 
      vehicle: vehicleData,
      token
    };
  }
}

module.exports = new DeviceSessionService();
