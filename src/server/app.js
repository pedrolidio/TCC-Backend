const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("../app/routes");
const { errorHandler } = require("../app/middlewares/errorHandler");

function createApp() {
  const app = express();

  // Middlewares globais
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Rotas
  app.use("/api", routes);

  // Middleware global de erro
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
