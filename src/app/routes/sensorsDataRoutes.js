const express = require("express");
const router = express.Router();
const SensorsDataController = require("../controllers/SensorsDataController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// Rotas protegidas
router.use(auth);

// GET /api/sensors-data?driving_configuration_id=id - Lista os dados de sensores coletados para a configuração de id especificado
router.get("/", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), SensorsDataController.show);

// POST /api/sensors-data - Armazena os dados de sensores de um veículo
router.post("/", checkRole([roles.VEHICLE]), SensorsDataController.create);

module.exports = router;
