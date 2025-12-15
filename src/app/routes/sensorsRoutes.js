const express = require("express");
const router = express.Router({ mergeParams: true });
const SensorsController = require("../controllers/SensorsController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// Rotas protegidas
router.use(auth);

// GET /api/vehicle/:id/sensors - Lista os sensores que um veículo suporta
router.get("/", checkRole([roles.ADMIN, roles.MANAGER, roles.MONITOR]), SensorsController.show.bind(SensorsController));

// POST /api/vehicle/:id/sensors - Cadastra os sensores que um veículo suporta
router.post("/", checkRole([roles.VEHICLE]), SensorsController.create.bind(SensorsController));

module.exports = router;
