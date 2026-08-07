const asyncHandler = require('express-async-handler');

// @desc    Get all GPUs
// @route   GET /api/gpus
// @access  Public
const getAllGPUs = asyncHandler(async(req, res) => {
  res.status(200).json({
    status: "OK",
    message: "All GPUs fetched successfully.",
    data: [
      {
        id: 1,
        brand: "NVIDIA",
        model: "RTX 5060",
      },
      {
        id: 2,
        brand: "AMD",
        model: "RX 9060 XT",
      },
    ],
  });
});

// @desc    Search GPUs
// @route   GET /api/gpus/search
// @access  Public
const searchGPUs = asyncHandler(async(req, res) => {
  const query = req.query.q;

  res.status(200).json({
    status: "OK",
    message: "Search endpoint working.",
    search: query,
  });
});

// @desc    Compare GPUs
// @route   GET /api/gpus/compare
// @access  Public

const compareGPUs = asyncHandler(async(req, res) => {
  const { gpu1, gpu2 } = req.query;

  res.status(200).json({
    status: "OK",
    message: "Comparison endpoint working.",
    compare: {
      gpu1,
      gpu2,
    },
  });
});

// @desc    Get single GPU by ID
// @route   GET /api/gpus/:id
// @access  Public

const getSingleGPU = asyncHandler(async(req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Single GPU fetched successfully.",
    data: {
      id: req.params.id,
      brand: "NVIDIA",
      model: "RTX 5060",
      vram: "8 GB",
      price: "$299",
    },
  });
});

module.exports = {
  getAllGPUs,
  searchGPUs,
  compareGPUs,
  getSingleGPU,
};

