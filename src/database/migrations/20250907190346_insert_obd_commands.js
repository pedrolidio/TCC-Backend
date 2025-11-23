/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex("OBD_Commands").insert([
        { command: "rpm", unit: "rpm" },
        { command: "speed_kmh", unit: "km/h" },
        { command: "engine_load", unit: "%" },
        { command: "coolant_temp_c", unit: "ºC" },
        { command: "throttle_pos_pct", unit: "%" },
        { command: "intake_temp_c", unit: "ºC" },
        { command: "map_kpa", unit: "kPa" },
        { command: "maf_gps", unit: "g/s" },
        { command: "timing_advance_deg", unit: "º" },
        { command: "battery_voltage", unit: "V" },
        { command: "fuel_status", unit: null },
        { command: "dtcs", unit: null },
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex("OBD_Commands")
        .whereIn("command", [
            "rpm", 
            "speed_kmh", 
            "engine_load", 
            "coolant_temp_c", 
            "throttle_pos_pct", 
            "intake_temp_c", 
            "map_kpa", 
            "maf_gps", 
            "timing_advance_deg", 
            "battery_voltage", 
            "fuel_status", 
            "dtcs", 
        ])
        .del();
};
