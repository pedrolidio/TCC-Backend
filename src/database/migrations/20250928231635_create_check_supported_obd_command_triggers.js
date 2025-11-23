/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Trigger antes de inserir um sensor em Driving_Configuration_Sensors
  await knex.raw(`
    CREATE TRIGGER check_supported_obd_before_insert
    BEFORE INSERT ON Driving_Configuration_Sensors
    FOR EACH ROW
    WHEN NOT EXISTS (
      SELECT 1
        FROM Driving_Configurations dc
        JOIN Supported_OBD_Commands sobc
          ON sobc.vehicle_id = dc.vehicle_id
         AND sobc.command_id = NEW.command_id
       WHERE dc.id = NEW.configuration_id
    )
    BEGIN
      SELECT RAISE(
        ABORT,
        'Comando não suportado para este veículo'
      );
    END;
  `);

  // Trigger antes de atualizar um sensor em Driving_Configuration_Sensors
  await knex.raw(`
    CREATE TRIGGER check_supported_obd_before_update
    BEFORE UPDATE ON Driving_Configuration_Sensors
    FOR EACH ROW
    WHEN NOT EXISTS (
      SELECT 1
        FROM Driving_Configurations dc
        JOIN Supported_OBD_Commands sobc
          ON sobc.vehicle_id = dc.vehicle_id
         AND sobc.command_id = NEW.command_id
       WHERE dc.id = NEW.configuration_id
    )
    BEGIN
      SELECT RAISE(
        ABORT,
        'Comando não suportado para este veículo'
      );
    END;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw(`DROP TRIGGER IF EXISTS check_supported_obd_command_before_insert;`);
  await knex.raw(`DROP TRIGGER IF EXISTS check_supported_obd_command_before_update;`);
};
