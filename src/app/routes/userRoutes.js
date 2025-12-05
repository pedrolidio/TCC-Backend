const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// GET /api/users - Lista todos os usuários
router.get("/", UserController.index);      

// GET /api/users/:id - Exibe os dados de um usuário pelo seu id
router.get("/:id", UserController.show);    

// POST /api/users - Cadastra um novo usuário
router.post("/", UserController.create);    

module.exports = router;
