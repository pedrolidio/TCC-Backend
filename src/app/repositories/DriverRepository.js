const { getSQLConnection } = require("../../config/database");

class DriverRepository {
  get connection() {
    return getSQLConnection();
  }

  async findAll() {
    return this.connection("Drivers").select("*");
  }

  async findById(id) {
    return this.connection("Drivers").where({ id }).first();
  }

  async findByLicense(license) {
    return this.connection("Drivers").where({ license }).first();
  }

  async create(driverData) {
    const [id] = await this.connection("Drivers").insert(driverData);
    return { id, ...driverData };
  }
}

module.exports = new DriverRepository();
