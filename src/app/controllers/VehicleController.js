const VehicleService = require("../services/VehicleService");

class VehicleController {
  async index(req, res, next) {
    try {
      const vehicles = await VehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const vehicle = await VehicleService.getVehicleById(id);
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { manufacturer, model, year, license_plate, vin } = req.body;

      const newVehicle = await VehicleService.createVehicle({ manufacturer, model, year, license_plate, vin });
      res.status(201).json({
        message: "Veículo cadastrado com sucesso!",
        vehicle: newVehicle,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VehicleController();
