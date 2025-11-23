const VehicleSensorsData = require("../models/VehicleSensorsData");

class SensorsDataRepository {
  async findByVehicleId(vehicleId) {
    return await VehicleSensorsData.find({ vehicle_id: vehicleId }).sort({ timestamp: -1 });
  }

  async findByVehicleAndDateRange(vehicleId, startDate, endDate) {
    const query = {
      vehicle_id: vehicleId,
      timestamp: {
        $gte: new Date(startDate)
      }
    };

    if (endDate) {
      query.timestamp.$lte = new Date(endDate);
    }

    return await VehicleSensorsData.find(query).sort({ timestamp: -1 });
  }

  async create(data) {
    return await VehicleSensorsData.create(data);
  }
}

module.exports = new SensorsDataRepository();
