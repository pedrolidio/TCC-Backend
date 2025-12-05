/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex("Users").insert([
        { 
            username: "admin",
            password_hash: "$2b$12$tBq69VXw92kl2WQNcvklBOV86yk9nQrigS313blP4MPmg.bIEA7r2",
            role_id: 1,
        },
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex("Users")
        .whereIn("username", [
            "admin",
        ])
        .del();
};
