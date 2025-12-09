const express = require("express");
const router = express.Router();
const UserSessionController = require("../controllers/UserSessionController"); 
const DeviceSessionController = require("../controllers/DeviceSessionController");

// POST /api/sessions/user - Autentica um usuário (Login)
router.post("/user", UserSessionController.create);

// POST /api/sessions/device - Autentica um dispositivo (Login)
router.post("/device", DeviceSessionController.create);    

module.exports = router;
