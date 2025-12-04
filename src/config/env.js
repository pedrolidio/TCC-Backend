require("dotenv").config();

if (!process.env.MONGO_URI)
  throw new Error("A variável de ambiente MONGO_URI não foi definida!");

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
};
