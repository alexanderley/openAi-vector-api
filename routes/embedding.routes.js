const express = require("express");
const router = express.Router();
const connectDB = require("../db/index");

// creates a embedding in OpenAI
const { createEmbedding } = require("../services/openaiServices");
const { findVectorMatches } = require("../services/vectorServices");

// Create a embeddin and store it
router.post("/storeVector", async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const vector = await createEmbedding(text);
  console.log("Embedding response:", vector);

  if (!text || !vector) {
    return res.status(400).json({ error: "Missing text or vector" });
  }

  try {
    // return;
    const db = await connectDB();
    const [result] = await db.query(
      `INSERT INTO myvectortable (text, vector) VALUES (?, JSON_ARRAY_PACK(?))`,
      [text, JSON.stringify(vector)]
    );
    console.log("result logged: ", result);
    res.json({
      message: "Vector stored successfully",
      result,
    });
  } catch (error) {
    console.error("Error in embedding route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// #todo test this route
router.post("/searchVectors", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  try {
    const vectorMatches = await findVectorMatches(text);
    res.status(200).json({ query: text, results: vectorMatches });
  } catch (error) {
    console.error("Error in searchVectors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
