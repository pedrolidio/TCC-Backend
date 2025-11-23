const mongoose = require("mongoose");

const VehicleSensorsDataSchema = new mongoose.Schema({
  vehicle_id: Number,
  timestamp: Date,
  rpm: Number,
  speed_kmh: Number,
  engine_load: Number,
  coolant_temp_c: Number,
  throttle_pos_pct: Number,
  intake_temp_c: Number,
  map_kpa: Number,
  maf_gps: Number,
  timing_advance_deg: Number,
  battery_voltage: Number,
  fuel_status: {
    type: [String],
    default: undefined
  },
  dtcs: {
    type: [String],
    default: undefined
  },
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("VehicleSensor", VehicleSensorsDataSchema);
