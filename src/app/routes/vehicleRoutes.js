const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/VehicleController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// POST /api/vehicle - Cadastra um novo veículo
router.post("/", VehicleController.create);

// Rotas protegidas
router.use(auth);

// GET /api/vehicle - Lista todos os veículos
router.get("/", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), VehicleController.index);

// GET /api/vehicle/:id - Exibe os dados de um veículo pelo seu id
router.get("/:id", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), VehicleController.show);

module.exports = router;
