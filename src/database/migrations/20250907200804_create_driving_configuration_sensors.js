/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Driving_Configuration_Sensors', function (table) {
        table.integer("configuration_id").notNullable();
        table.integer("command_id").notNullable();

        table.primary(["configuration_id", "command_id"]);

        table.foreign("configuration_id").references("id").inTable("Driving_Configurations");
        table.foreign("command_id").references("id").inTable("OBD_Commands");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Driving_Configuration_Sensors');
};
