const VehicleRepository = require("../repositories/VehicleRepository");

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

  async createVehicle({ manufacturer, model, year, license_plate }) {
    if (!manufacturer || !model || !year || !license_plate) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    const existing = await VehicleRepository.findByLicensePlate(license_plate);
    if (existing) {
      const error = new Error("DUPLICATE_LICENSE_PLATE");
      error.status = 409;
      throw error;
    }

    return VehicleRepository.create({ manufacturer, model, year, license_plate });
  }
}

module.exports = new VehicleService();
