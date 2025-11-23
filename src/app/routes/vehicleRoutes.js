const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/VehicleController");

// GET /api/vehicle - Lista todos os veículos
router.get("/", VehicleController.index);

// GET /api/vehicle/:id - Exibe os dados de um veículo pelo seu id
router.get("/:id", VehicleController.show);

// POST /api/vehicle - Cadastra um novo condutor
router.post("/", VehicleController.create);

module.exports = router;
