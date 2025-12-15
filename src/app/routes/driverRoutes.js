const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/DriverController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// Rotas protegidas
router.use(auth);

// GET /api/drivers - Lista todos os condutores
router.get("/", checkRole([roles.ADMIN, roles.MANAGER]), DriverController.index);      

// GET /api/drivers/:id - Exibe os dados de um condutor pelo seu id
router.get("/:id", checkRole([roles.ADMIN, roles.MANAGER]), DriverController.show);    

// POST /api/drivers - Cadastra um novo condutor
router.post("/", checkRole([roles.ADMIN, roles.MANAGER]), DriverController.create);    

module.exports = router;
