const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const roles = require("../../config/roles");

// Rotas protegidas
router.use(auth);

// GET /api/users - Lista todos os usuários
router.get("/", checkRole([roles.ADMIN]), UserController.index);

// GET /api/users/:id - Exibe os dados de um usuário pelo seu id
router.get("/:id", checkRole([roles.ADMIN]), UserController.show);

// POST /api/users - Cadastra um novo usuário
router.post("/", checkRole([roles.ADMIN]), UserController.create);

module.exports = router;
