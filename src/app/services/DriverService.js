const DriverRepository = require("../repositories/DriverRepository");
const validateDriverLicense = require("../utils/validateDriverLicense");

class DriverService {
  async getAllDrivers() {
    return DriverRepository.findAll();
  }

  async getDriverById(id) {
    const driver = await DriverRepository.findById(id);
    if (!driver) {
      const error = new Error("DRIVER_NOT_FOUND");
      error.status = 404;
      throw error;
    }
    return driver;
  }

  async createDriver({ name, license, category }) {
    if (!name || !license || !category) {
      const error = new Error("MISSING_FIELDS");
      error.status = 400;
      throw error;
    }

    if (!validateDriverLicense(license)) {
      const error = new Error("INVALID_LICENSE");
      error.status = 400;
      throw error;
    }

    const existing = await DriverRepository.findByLicense(license);
    if (existing) {
      const error = new Error("DUPLICATE_LICENSE");
      error.status = 409;
      throw error;
    }

    return DriverRepository.create({ name, license, category });
  }
}

module.exports = new DriverService();
