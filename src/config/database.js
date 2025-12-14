const env = require("./env");
const knex = require("knex");
const knexConfig = require("../../knexfile");

let sqlConnection = null;

async function connectSQL() {
  if (sqlConnection) {
    console.log("📦 Conexão SQL já existente.");
    return sqlConnection;
  }

  const environment = env.app.nodeEnv;
  const config = knexConfig[environment];
  sqlConnection = knex(config);

  try {
    await sqlConnection.raw("select 1");
    console.log("Banco SQL conectado com sucesso.");
  } catch (err) {
    console.error("Erro ao conectar ao banco SQL:", err.message);
    sqlConnection = null;
    throw err;
  }

  return sqlConnection;
}

function getSQLConnection() {
  if (!sqlConnection) {
    throw new Error("Banco SQL não conectado. Execute connectSQL() antes.");
  }
  return sqlConnection;
}

module.exports = { connectSQL, getSQLConnection };
