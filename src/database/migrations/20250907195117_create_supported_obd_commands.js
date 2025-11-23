/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Supported_OBD_Commands', function (table) {
        table.integer("vehicle_id").notNullable();
        table.integer("command_id").notNullable();

        table.primary(["vehicle_id", "command_id"]);

        table.foreign("vehicle_id").references("id").inTable("Vehicles");
        table.foreign("command_id").references("id").inTable("OBD_Commands");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Supported_OBD_Commands');
};
