const express = require("express");
const router = express.Router();
const { getAllGPUs, searchGPUs, compareGPUs, getSingleGPU} = require("../controllers/gpuController");

// GET all GPUs
router.get("/gpus", getAllGPUs);

// Search GPUs
// Example: /api/gpus/search?q=5060
router.get("/gpus/search", searchGPUs);

// Compare GPUs
// Example: /api/gpus/compare?gpu1=5060&gpu2=9060xt
router.get("/gpus/compare", compareGPUs);

// Get single GPU by ID
router.get("/gpus/:id", getSingleGPU);

module.exports = router;