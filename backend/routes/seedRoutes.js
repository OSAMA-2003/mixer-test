const express = require("express");
const router = express.Router();
const { seedDatabase, getSeedStats } = require("../controllers/seedController");

router.post("/", seedDatabase);
router.get("/stats", getSeedStats);

module.exports = router;
