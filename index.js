const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const openAiHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};
console.log("Component runs");

// function to create embedding on openAI
async function createEmbedding(textToEmbed) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: openAiHeaders,
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input: textToEmbed,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("data", data);
  return data;
}

const mysql = require("mysql2/promise");

// Function to establish database connection
async function testDB() {
  try {
    const db = await mysql.createConnection({
      host: process.env.SINGLESTORE_HOST || "localhost",
      user: process.env.SINGLESTORE_USER || "root",
      password: process.env.SINGLESTORE_PASSWORD || "",
      database: process.env.SINGLESTORE_DATABASE || "test",
      port: process.env.SINGLESTORE_PORT || 3333,
      ssl: {
        ca: fs.readFileSync(__dirname + "/singlestore_bundle.pem"),
      },
    });

    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("Connected! Test query result:", rows[0].result);
    await db.end();
  } catch (err) {
    console.error("Error connecting to SingleStore:", err.message);
  }
}

testDB();
