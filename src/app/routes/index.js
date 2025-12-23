const express = require("express");
const router = express.Router();

const driverRoutes = require("./driverRoutes");
const vehicleRoutes = require("./vehicleRoutes");
const sensorsRoutes = require("./sensorsRoutes");
const drivingConfigurationRoutes = require("./drivingConfigurationRoutes");
const sensorsDataRoutes = require("./sensorsDataRoutes");
const userRoutes = require("./userRoutes");
const sessionRoutes = require("./sessionRoutes");

router.use("/drivers", driverRoutes);
router.use("/vehicles/:id/sensors", sensorsRoutes);
router.use("/sensors", sensorsRoutes);
router.use("/vehicles/:id/driving-configurations", drivingConfigurationRoutes);
router.use("/driving-configurations", drivingConfigurationRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/sensors-data", sensorsDataRoutes);
router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

module.exports = router;
