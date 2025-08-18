const express = require("express");
// const app = express();
const app = require("./app");

const PORT = process.env.PORT || 5005;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
