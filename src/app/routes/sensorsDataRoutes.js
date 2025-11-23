const express = require("express");
const router = express.Router();
const SensorsDataController = require("../controllers/SensorsDataController");

// GET /api/sensors-data?driving_configuration_id=id - Lista os dados de sensores coletados para a configuração de id especificado
router.get("/", SensorsDataController.show);

// POST /api/sensors-data - Armazena os dados de sensores de um veículo
router.post("/", SensorsDataController.create);

module.exports = router;
