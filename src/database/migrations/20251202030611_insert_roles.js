const roles = require("../../config/roles");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex("Roles").insert([
        { id: roles.ADMIN, role: "admin" },
        { id: roles.EDITOR, role: "editor" },
        { id: roles.VIEWER, role: "viewer" },
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
