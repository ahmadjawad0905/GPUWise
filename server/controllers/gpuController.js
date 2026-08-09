const asyncHandler = require("express-async-handler");
const GPU = require("../models/GPU");
const filterGPUs = require("../services/gpuFilterService");
const askGemini = require("../services/geminiService");
const getCandidates = require("../services/recommendationService");
const recommendGPUs = require("../services/recommendationService");

// @desc    Test Gemini AI
// @route   GET /api/gpus/test-gemini
const testGemini = asyncHandler(async (req, res) => {

    const response = await askGemini(
        "You are GPUWise, a GPU recommendation assistant. Say hello and explain your role in one sentence."
    );

    res.status(200).json({
        status: "OK",
        message: "Gemini API is working.",
        response: response
    });
});

// @desc    Get candidate GPUs based on user requirements
// @route   GET /api/gpus/candidates

const testCandidates = asyncHandler(async (req, res) => {

    const requirements = req.query;

    const candidates = await getCandidates(requirements);

    res.status(200).json({
        status: "OK",
        message: "Candidate GPUs generated successfully.",
        count: candidates.length,
        data: candidates
    });
});

// desc get recommendation
// route GET 
const getRecommendation = asyncHandler(async (req, res) => {

    const requirements = req.query;

    const result = await recommendGPUs(requirements);

    res.status(200).json({
        status: "OK",
        message: "GPU recommendation generated successfully.",
        data: result
    });
});

// @desc    Get all GPUs
// @route   GET /api/gpus
// @access  Public
const getAllGPUs = asyncHandler(async (req, res) => {
  const gpus = await GPU.find();

  res.status(200).json({
    status: "OK",
    message: "All GPUs fetched successfully.",
    count: gpus.length,
    data: gpus,
  });
});

// @desc    Search GPUs
// @route   GET /api/gpus/search?q=5060
// @access  Public
const searchGPUs = asyncHandler(async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      status: "ERROR",
      message: "Please provide a search query.",
    });
  }

  const gpus = await GPU.find({
    $or: [
      { model: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
      { series: { $regex: query, $options: "i" } },
    ],
  });

  res.status(200).json({
    status: "OK",
    message: "GPU search completed successfully.",
    count: gpus.length,
    data: gpus,
  });
});

// @desc    Compare two GPUs
// @route   GET /api/gpus/compare?gpu1=rtx-5060&gpu2=rx-9060-xt
// @access  Public
const compareGPUs = asyncHandler(async (req, res) => {
  const { gpu1, gpu2 } = req.query;

  if (!gpu1 || !gpu2) {
    return res.status(400).json({
      status: "ERROR",
      message: "Please provide two GPU slugs to compare.",
    });
  }

  const firstGPU = await GPU.findOne({ slug: gpu1 });
  const secondGPU = await GPU.findOne({ slug: gpu2 });

  if (!firstGPU || !secondGPU) {
    return res.status(404).json({
      status: "ERROR",
      message: "One or both GPUs could not be found.",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "GPU comparison fetched successfully.",
    data: {
      gpu1: firstGPU,
      gpu2: secondGPU,
    },
  });
});

// @desc    Get single GPU by slug
// @route   GET /api/gpus/:slug
// @access  Public
const getSingleGPU = asyncHandler(async (req, res) => {
  const gpu = await GPU.findOne({
    slug: req.params.slug,
  });

  if (!gpu) {
    return res.status(404).json({
      status: "ERROR",
      message: "GPU not found.",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "Single GPU fetched successfully.",
    data: gpu,
  });
});

// @desc    Get filtered GPUs
// @route   GET /api/gpus/filter
// @access  Public

const getFilteredGPUs = asyncHandler(async (req, res) => {

    const requirements = req.query;

    // Get all GPUs from MongoDB
    const gpus = await GPU.find();

    // Filter GPUs according to user requirements
    const filteredGPUs = filterGPUs(gpus, requirements);

    res.status(200).json({
        status: "OK",
        message: "Filtered GPUs fetched successfully.",
        count: filteredGPUs.length,
        data: filteredGPUs,
    });
});


module.exports = {
  getAllGPUs,
  searchGPUs,
  compareGPUs,
  getSingleGPU,
  getFilteredGPUs,
  testGemini,
  testCandidates,
  getRecommendation
};