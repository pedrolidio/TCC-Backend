const { getSQLConnection } = require("../../config/database");

class SensorsRepository {
  get connection() {
    return getSQLConnection();
  }

  async getSupportedCommandsByVehicle(vehicleId) {
    return this.connection("Supported_OBD_Commands as soc")
      .join("OBD_Commands as oc", "soc.command_id", "oc.id")
      .where("soc.vehicle_id", vehicleId)
      .select("oc.id", "oc.command", "oc.unit");
  }

  async getOBDCommandsByNames(commands) {
    return this.connection("OBD_Commands")
      .whereIn("command", commands)
      .select("id", "command");
  }

  async insertSupportedCommands(vehicleId, commandIds) {
    const entries = commandIds.map(command_id => ({
      vehicle_id: vehicleId,
      command_id,
    }));

    await this.connection("Supported_OBD_Commands").insert(entries);
  }
}

module.exports = new SensorsRepository();
