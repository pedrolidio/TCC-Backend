const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// GET /api/users - Lista todos os condutores
router.get("/", UserController.index);      

// GET /api/users/:id - Exibe os dados de um condutor pelo seu id
router.get("/:id", UserController.show);    

// POST /api/users - Cadastra um novo condutor
router.post("/", UserController.create);    

module.exports = router;
