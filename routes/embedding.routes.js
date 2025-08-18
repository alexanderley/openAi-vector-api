const express = require("express");
const router = express.Router();
const connectDB = require("../db/index");

// creates a embedding in OpenAI
const { createEmbedding } = require("../services/openaiServices");

// Create a embeddin and store it
router.post("/storeVector", async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const vector = await createEmbedding(text);
  console.log("Embedding response:", vector);

  // This is the format the vector database need
  if (!text || !vector) {
    return res.status(400).json({ error: "Missing text or vector" });
  }
  // res.status(200).json({ message: "Vector created successfully", vector });
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

module.exports = router;
