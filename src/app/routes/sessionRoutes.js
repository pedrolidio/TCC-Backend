const express = require("express");
const router = express.Router();
const UserSessionController = require("../controllers/UserSessionController"); 

// POST /api/sessions - Autentica um usuário (Login)
router.post("/user", UserSessionController.create);    

module.exports = router;
