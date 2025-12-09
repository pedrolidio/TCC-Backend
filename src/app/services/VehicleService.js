const VehicleRepository = require("../repositories/VehicleRepository");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const validateVin = require("../utils/validateVin");
const validateLicensePlate = require("../utils/validateLicensePlate");

class VehicleService {
  async getAllVehicles() {
    return VehicleRepository.findAll();
  }

  async getVehicleById(id) {
    const vehicle = await VehicleRepository.findById(id);
    if (!vehicle) {
      const error = new Error("VEHICLE_NOT_FOUND");
      error.status = 404;
      throw error;
    }
    return vehicle;
  }

  async getVehicleByVin(vin) {
    const vehicle = await VehicleRepository.findByVin(vin);
    if (!vehicle) {
      const error = new Error("VEHICLE_NOT_FOUND");
      error.status = 404;
      throw error;
    }
    return vehicle;
  }

  async createVehicle({ manufacturer, model, year, license_plate, vin }) {
    if (!manufacturer || !model || !year || !license_plate || !vin) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    const yearInt = parseInt(year, 10);
    if (isNaN(yearInt) || yearInt < 1900 || yearInt > new Date().getFullYear() + 1) {
        const error = new Error("INVALID_YEAR");
        error.status = 400;
        throw error;
    }

    if (!validateVin(vin)) {
      const err = new Error("INVALID_VIN");
      err.status = 400;
      throw err;
    }

    if (!validateLicensePlate(license_plate)) {
      const err = new Error("INVALID_LICENSE_PLATE");
      err.status = 400;
      throw err;
    }

    const secret = crypto.randomBytes(16).toString('hex');
    const secretHash = await bcrypt.hash(secret, 12);

    const { id } = await VehicleRepository.create({ manufacturer, model, year, license_plate, vin, secret_hash: secretHash })
      
    return {
      id,
      manufacturer,
      model,
      year,
      license_plate,
      vin,
      secret
    };
  }
}

module.exports = new VehicleService();
