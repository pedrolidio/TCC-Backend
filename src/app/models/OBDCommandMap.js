const OBDCommandMap = {
  RPM: "rpm",
  SPEED: "speed_kmh",
  ENGINE_LOAD: "engine_load",
  COOLANT_TEMP: "coolant_temp_c",
  THROTTLE_POS: "throttle_pos_pct",
  INTAKE_TEMP: "intake_temp_c",
  INTAKE_PRESSURE: "map_kpa",
  MAF: "maf_gps",
  TIMING_ADVANCE: "timing_advance_deg",
  ELM_VOLTAGE: "battery_voltage",
  FUEL_STATUS: "fuel_status",
  GET_DTC: "dtcs",
};

module.exports = OBDCommandMap;
