require("dotenv").config();
const { connectMongoDB } = require("./config/mongoose");
const { connectSQL } = require("./config/database");
const { startServer } = require("./server/server");

(async () => {
  try {
    console.log("Inicializando aplicação...");

    // Conecta aos bancos de dados
    await connectSQL();
    await connectMongoDB();

    // Inicia o servidor Express
    const app = await startServer();
    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
  } catch (error) {
    console.error("Erro ao inicializar a aplicação:", error);
    process.exit(1);
  }
})();
