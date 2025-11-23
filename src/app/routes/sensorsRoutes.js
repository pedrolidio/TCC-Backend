const express = require("express");
const router = express.Router({ mergeParams: true });
const SensorsController = require("../controllers/SensorsController");

// GET /api/vehicle/:id/sensors - Lista os sensores que um veículo suporta
router.get("/", SensorsController.show.bind(SensorsController));

// POST /api/vehicle/:id/sensors - Cadastra os sensores que um veículo suporta
router.post("/", SensorsController.create.bind(SensorsController));

module.exports = router;
