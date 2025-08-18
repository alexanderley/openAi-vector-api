const express = require("express");
const router = express.Router();

router.post("/embedding", async (req, res, next) => {
  //   try {
  //     const { text } = req.body;
  //     const response = await embeddingService.createEmbedding(text);
  //     res.json({ response });
  //   } catch (error) {
  //     next(error);
  //   }
});

module.exports = router;
