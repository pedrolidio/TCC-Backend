const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController"); 

// POST /api/sessions - Autentica um usuário (Login)
router.post("/", SessionController.create);    

module.exports = router;
