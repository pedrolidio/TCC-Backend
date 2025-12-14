require("dotenv").config();

function getEnvVar(key, defaultValue = undefined) {
  const value = process.env[key];

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new Error(`CRITICAL: A variável de ambiente obrigatória '${key}' não foi definida.`);
  }

  return value;
}

module.exports = {
  app: {
    port: getEnvVar("PORT", 3000),
    nodeEnv: getEnvVar("NODE_ENV", "development"),
  },
  db: {
    mongoUri: getEnvVar("MONGO_URI"),
  },
  jwt: {
    secret: getEnvVar("JWT_SECRET"),
    expiresIn: getEnvVar("JWT_EXPIRES_IN", "1d"),
  },
};
