const { createApp } = require("./app");

async function startServer() {
  const app = createApp();
  return app;
}

module.exports = { startServer };
