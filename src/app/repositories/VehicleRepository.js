const { getSQLConnection } = require("../../config/database");

class VehicleRepository {
  get connection() {
    return getSQLConnection();
  }

  async findAll() {
    return this.connection("Vehicles").select("*");
  }

  async findById(id) {
    return this.connection("Vehicles").where({ id }).first();
  }

  async findByLicensePlate(license_plate) {
    return this.connection("Vehicles").where({ license_plate }).first();
  }

  async findByVin(vin) {
    return this.connection("Vehicles").where({ vin }).first();
  }

  async create(vehicleData) {
    try {
      const [id] = await this.connection("Vehicles").insert(vehicleData);
      return { id, ...vehicleData };
    } catch (error) {
      if (error.message && error.message.includes("UNIQUE constraint failed: Vehicles.vin")) {
        const err = new Error("DUPLICATE_VIN");
        err.status = 409;
        throw err;
      }
      else if (error.message && error.message.includes("UNIQUE constraint failed: Vehicles.license_plate")) {
        const err = new Error("DUPLICATE_LICENSE_PLATE");
        err.status = 409;
        throw err;
      }
      throw error;
    }
  }
}

module.exports = new VehicleRepository();
