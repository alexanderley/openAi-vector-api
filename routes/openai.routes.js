const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const client = new OpenAI();

const { findVectorMatches } = require("../services/vectorServices");

router.post("/openai", async (req, res, next) => {
  const message = req.body.message;
  try {
    const vectorMatches = await findVectorMatches(message, 5);
    const factualData = vectorMatches
      .map((match, i) => `Fact ${i + 1} (score: ${match.score}): ${match.text}`)
      .join("\n\n");
    const prompt = `Below is factual information retrieved from a database. Use it to answer the user's question. Do not make up information outside of what is provided.

    Factual information:
    ${factualData}

    User's question:
    ${message}`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    console.log("OpenAI response:", response.output_text);
    res.status(200).json({ message: response.output_text });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
