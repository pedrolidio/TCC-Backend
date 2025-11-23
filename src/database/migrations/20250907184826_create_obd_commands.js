/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('OBD_Commands', function (table) {
        table.increments('id').primary();
        table.string('command').notNullable();
        table.string('unit');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('OBD_Commands');
};
