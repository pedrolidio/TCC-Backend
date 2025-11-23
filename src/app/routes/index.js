const express = require("express");
const router = express.Router();

const driverRoutes = require("./driverRoutes");
const vehicleRoutes = require("./vehicleRoutes");
const sensorsRoutes = require("./sensorsRoutes");
const drivingConfigurationRoutes = require("./drivingConfigurationRoutes");
const sensorsDataRoutes = require("./sensorsDataRoutes");

router.use("/drivers", driverRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/vehicles/:id/sensors", sensorsRoutes);
router.use("/vehicles/:id/driving-configurations", drivingConfigurationRoutes);
router.use("/sensors-data", sensorsDataRoutes);


module.exports = router;
