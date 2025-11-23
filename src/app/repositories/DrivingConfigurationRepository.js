const { getSQLConnection } = require("../../config/database");

class DrivingConfigurationRepository {
  get connection() {
    return getSQLConnection();
  }

  async findActiveConfigByVehicle(vehicleId) {
    return this.connection("Driving_Configurations")
      .where({ vehicle_id: vehicleId, end_date: null })
      .first();
  }

  async findSensorsByConfig(configId) {
    return this.connection("Driving_Configuration_Sensors as dcs")
      .join("OBD_Commands as oc", "dcs.command_id", "oc.id")
      .where("dcs.configuration_id", configId)
      .select("oc.command");
  }

  async findSensorsByConfigIds(configIds) {
    return this.connection("Driving_Configuration_Sensors as dcs")
      .join("OBD_Commands as oc", "dcs.command_id", "oc.id")
      .whereIn("dcs.configuration_id", configIds)
      .select("dcs.configuration_id", "oc.command");
  }

  async createConfig(configData, sensor_ids) {
    const { driver_id, vehicle_id, start_date, gps_enabled, sampling_interval } = configData;

    return this.connection.transaction(async (trx) => {
      // Desativa configuração anterior, caso exista
      await trx("Driving_Configurations")
        .where({ vehicle_id: vehicle_id, end_date: null })
        .update({ end_date: start_date });

      // Insere nova configuração
      const [configuration_id] = await trx("Driving_Configurations").insert({
        driver_id,
        vehicle_id,
        start_date,
        end_date: null,
        gps_enabled,
        sampling_interval,
      });

      // Insere os sensores da nova configuração, caso existam
      if (sensor_ids && sensor_ids.length > 0) {
        const records = sensor_ids.map(command_id => ({
          configuration_id,
          command_id,
        }));
        await trx("Driving_Configuration_Sensors").insert(records);
      }

      return configuration_id;
    });
  }

  async findByIdAndVehicleId(id, vehicleId) {
    return this.connection("Driving_Configurations")
      .where({ id, vehicle_id: vehicleId })
      .first();
  }

  async findByVehicleId(id) {
    return this.connection("Driving_Configurations")
      .where({ vehicle_id: id })
      .orderBy("start_date", "desc");
  }
}

module.exports = new DrivingConfigurationRepository();
