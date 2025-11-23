const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/DriverController");

// GET /api/drivers - Lista todos os condutores
router.get("/", DriverController.index);      

// GET /api/drivers/:id - Exibe os dados de um condutor pelo seu id
router.get("/:id", DriverController.show);    

// POST /api/drivers - Cadastra um novo condutor
router.post("/", DriverController.create);    

module.exports = router;
