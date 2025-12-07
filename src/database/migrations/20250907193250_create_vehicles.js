/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE TABLE Vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            manufacturer TEXT NOT NULL,
            model TEXT NOT NULL,
            year TEXT NOT NULL CHECK (CAST(year AS INTEGER) > 0),
            license_plate TEXT NOT NULL UNIQUE CHECK (
                LENGTH(license_plate) = 7 AND (
                    license_plate GLOB '[A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]' OR
                    license_plate GLOB '[A-Z][A-Z][A-Z][0-9][A-Z][0-9][0-9]'
                )
            ),
            vin TEXT NOT NULL UNIQUE CHECK (
                LENGTH(vin) = 17 AND 
                vin GLOB '[A-Z0-9]*' AND
                vin NOT GLOB '*[IOQ]*'
            ),
            secret_hash TEXT NOT NULL
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Vehicles');
};
