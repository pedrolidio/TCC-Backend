const DriverService = require("../services/DriverService");

class DriverController {
  async index(req, res, next) {
    try {
      const drivers = await DriverService.getAllDrivers();
      res.json(drivers);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const driver = await DriverService.getDriverById(id);
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, license, category } = req.body;
      const newDriver = await DriverService.createDriver({ name, license, category });
      res.status(201).json({
        message: "Condutor cadastrado com sucesso!",
        driver: newDriver,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DriverController();
