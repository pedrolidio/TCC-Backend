const express = require("express");
const router = express.Router({ mergeParams: true });
const DrivingConfigurationController = require("../controllers/DrivingConfigurationController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// Rotas protegidas
router.use(auth);

// GET /api/vehicles/:id/driving-config - Lista o histórico de configurações de sensores de um veículo
router.get("/", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), DrivingConfigurationController.index);

// GET /api/vehicles/:id/driving-config/active - Exibe os dados da configuração de sensores atual de um veículo
router.get("/active", checkRole([roles.ADMIN, roles.VEHICLE]), DrivingConfigurationController.active);

// GET /api/vehicles/:id/driving-config/:config_id
router.get("/:config_id", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), DrivingConfigurationController.show);

// POST /api/vehicles/:id/driving-config - Cadastra uma nova configuração de sensores para um veículo
router.post("/", checkRole([roles.ADMIN, roles.MANAGER]), DrivingConfigurationController.create);

module.exports = router;
