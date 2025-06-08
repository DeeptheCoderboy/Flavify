import express from 'express';
const router = express.Router();
import Test from '../models/Test.js'; // Assuming you have a Test model

// POST route to store test
router.post("/store-test", async (req, res) => {
  try {
    const { email, temperature, wbc, platelets, risk } = req.body;
    const newTest = new Test({ email, temperature, wbc, platelets, risk, date: new Date() });
    await newTest.save();
    res.status(200).json({ msg: "Test stored successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch test history
router.get("/test-history/:email", async (req, res) => {
  try {
    const tests = await Test.find({ email: req.params.email }).sort({ date: -1 });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
