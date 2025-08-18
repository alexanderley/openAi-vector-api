const express = require("express");
const router = express.Router();

router.post("/openai", async (req, res, next) => {
  //   try {
  //     const { prompt } = req.body;
  //     const response = await openAiService.generateResponse(prompt);
  //     res.json({ response });
  //   } catch (error) {
  //     next(error);
  //   }
});

module.exports = router;
