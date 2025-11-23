/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE Drivers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            license TEXT NOT NULL UNIQUE CHECK (
                LENGTH(license) = 11 AND license GLOB '[0-9]*'
            ),
            category TEXT NOT NULL CHECK (
                LENGTH(category) <= 2 AND category IN (
                    'A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'
                )
            )
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Drivers');
};
