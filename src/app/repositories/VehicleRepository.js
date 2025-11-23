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

  async create(vehicleData) {
    const [id] = await this.connection("Vehicles").insert(vehicleData);
    return { id, ...vehicleData };
  }
}

module.exports = new VehicleRepository();
