/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Driving_Configurations', function (table) {
        table.increments('id').primary();
        table.integer("driver_id").notNullable();
        table.integer("vehicle_id").notNullable();
        table.timestamp("start_date").notNullable();
        table.timestamp("end_date");
        table.boolean("gps_enabled").notNullable();
        table.decimal("sampling_interval").notNullable();

        table.foreign("driver_id").references("id").inTable("Drivers");
        table.foreign("vehicle_id").references("id").inTable("Vehicles");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Driving_Configurations');
};
