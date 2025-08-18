require("dotenv/config");
require("./db");
const express = require("express");

const app = express();
require("./config")(app);

const allRoutes = require("./routes");
app.use("/api", allRoutes);

const embeddingRouter = require("./routes/embedding.routes");
app.use("/api", embeddingRouter);

const openAiRouter = require("./routes/openai.routes");
app.use("/api", openAiRouter);

require("./error-handling")(app);

module.exports = app;
