const connectDB = require("../db/index");
const { createEmbedding } = require("../services/openaiServices");

async function findVectorMatches(text, limit) {
  if (!text) {
    throw new Error("Text is required to find vector matches");
  }

  try {
    const queryEmbedding = await createEmbedding(text);
    const db = await connectDB();

    const [rows] = await db.query(
      `
      SELECT 
        text, 
        DOT_PRODUCT(vector, JSON_ARRAY_PACK(?)) AS score
      FROM myvectortable
      ORDER BY score DESC
      LIMIT 3
      `,
      [JSON.stringify(queryEmbedding), limit]
    );
    return rows;
  } catch (error) {
    console.error("Error finding vector matches:", error);
    throw new Error("Internal Server Error");
  }
}

module.exports = { findVectorMatches };
