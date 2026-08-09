const express = require("express");
const router = express.Router();
const { getAllGPUs, searchGPUs, compareGPUs, getSingleGPU, getFilteredGPUs, testGemini, testCandidates, getRecommendation} = require("../controllers/gpuController");

// GET all GPUs
router.get("/gpus", getAllGPUs);

// Test Gemini AI
router.get("/gpus/test-gemini", testGemini);

// Get Recommmendation
router.get("/gpus/recommend", getRecommendation);

// Test Candidate GPUs
router.get("/gpus/test-candidates", testCandidates);

// Get Filtered GPUs
router.get("/gpus/filter", getFilteredGPUs);

// Search GPUs
// Example: /api/gpus/search?q=5060
router.get("/gpus/search", searchGPUs);

// Compare GPUs
// Example: /api/gpus/compare?gpu1=5060&gpu2=9060xt
router.get("/gpus/compare", compareGPUs);

// Get single GPU by ID
router.get("/gpus/:id", getSingleGPU);


module.exports = router;