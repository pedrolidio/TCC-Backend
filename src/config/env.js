require("dotenv").config();

if (!process.env.MONGO_URI)
  throw new Error("A variável de ambiente MONGO_URI não foi definida!");

if (!process.env.JWT_SECRET) {
  throw new Error("A variável de ambiente JWT_SECRET não foi definida!");
}

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Valor padrão caso não definido
  },
};
