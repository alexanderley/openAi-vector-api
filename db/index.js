const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

let db;

async function connectDB() {
  if (!db) {
    db = mysql.createPool({
      host: process.env.SINGLESTORE_HOST || "localhost",
      user: process.env.SINGLESTORE_USER || "root",
      password: process.env.SINGLESTORE_PASSWORD || "",
      database: process.env.SINGLESTORE_DATABASE || "test",
      port: process.env.SINGLESTORE_PORT || 3333,
      ssl: {
        ca: fs.readFileSync(
          path.join(__dirname, "..", "singlestore_bundle.pem")
        ),
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Connected to SingleStore!");
  }
  return db;
}

module.exports = connectDB;
