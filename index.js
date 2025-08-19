const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const openAiHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

const mysql = require("mysql2/promise");

// Function to establish database connection
// async function testDB() {
//   try {
//     const db = await mysql.createConnection({
//       host: process.env.SINGLESTORE_HOST || "localhost",
//       user: process.env.SINGLESTORE_USER || "root",
//       password: process.env.SINGLESTORE_PASSWORD || "",
//       database: process.env.SINGLESTORE_DATABASE || "test",
//       port: process.env.SINGLESTORE_PORT || 3333,
//       ssl: {
//         ca: fs.readFileSync(__dirname + "/singlestore_bundle.pem"),
//       },
//     });

//     const [rows] = await db.query("SELECT 1 + 1 AS result");
//     await db.end();
//   } catch (err) {
//     console.error("Error connecting to SingleStore:", err.message);
//   }
// }

// testDB();
