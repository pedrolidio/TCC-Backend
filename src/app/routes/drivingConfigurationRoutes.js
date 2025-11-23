const express = require("express");
const router = express.Router({ mergeParams: true });
const DrivingConfigurationController = require("../controllers/DrivingConfigurationController");

// GET /api/vehicles/:id/driving-config - Lista o histórico de configurações de sensores de um veículo
router.get("/", DrivingConfigurationController.index);

// GET /api/vehicles/:id/driving-config/active - Exibe os dados da configuração de sensores atual de um veículo
router.get("/active", DrivingConfigurationController.show);

// POST /api/vehicles/:id/driving-config - Cadastra uma nova configuração de sensores para um veículo
router.post("/", DrivingConfigurationController.create);

module.exports = router;
