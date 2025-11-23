const mongoose = require("mongoose");

async function connectMongoDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/TCC";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado com sucesso.");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
    throw err;
  }
}

module.exports = { connectMongoDB };
