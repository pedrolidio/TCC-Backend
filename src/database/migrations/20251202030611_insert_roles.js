/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex("Roles").insert([
        { role: "admin" },
        { role: "editor" },
        { role: "viewer" },
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex("Roles")
        .whereIn("role", [
            "admin", 
            "editor", 
            "viewer",
        ])
        .del();
};
