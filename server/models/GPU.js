const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema(
  {
    // =========================
    // Identity
    // =========================
    brand: {
      type: String,
      required: true,
      enum: ["NVIDIA", "AMD"],
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    series: {
      type: String,
      required: true,
      trim: true,
    },

    architecture: {
      type: String,
      required: true,
      trim: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    tier: {
      type: String,
      required: true,
      enum: [
        "entry-level",
        "mid-range",
        "upper-mid-range",
        "high-end",
        "flagship",
      ],
    },

    // =========================
    // Core Performance
    // =========================
    compute: {
      cudaCores: {
        type: Number,
        default: null,
      },

      streamProcessors: {
        type: Number,
        default: null,
      },

      rtCores: {
        type: Number,
        default: null,
      },

      tensorCores: {
        type: Number,
        default: null,
      },

      aiAccelerators: {
        type: Number,
        default: null,
      },

      baseClockMHz: {
        type: Number,
        required: true,
      },

      boostClockMHz: {
        type: Number,
        required: true,
      },
    },

    // =========================
    // Memory
    // =========================
    memory: {
      vramGB: {
        type: Number,
        required: true,
      },

      memoryType: {
        type: String,
        required: true,
        enum: ["GDDR5", "GDDR6", "GDDR6X", "GDDR7", "HBM", "HBM2", "HBM3"],
      },

      memoryBusBit: {
        type: Number,
        required: true,
      },

      memoryBandwidthGBs: {
        type: Number,
        required: true,
      },
    },

    // =========================
    // Pricing
    // =========================
    pricing: {
      launchMSRP: {
        type: Number,
        required: true,
      },

      currentPrice: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "USD",
        uppercase: true,
      },
    },

    // =========================
    // Benchmark / Performance
    // =========================
    performance: {
      gaming1080p: {
        type: Number,
        default: null,
      },

      gaming1440p: {
        type: Number,
        default: null,
      },

      gaming4k: {
        type: Number,
        default: null,
      },

      rayTracing: {
        type: Number,
        default: null,
      },

      productivity: {
        type: Number,
        default: null,
      },

      aiMl: {
        type: Number,
        default: null,
      },
    },

    // =========================
    // Software Features
    // =========================
    software: {
      upscaling: {
        type: [String],
        default: [],
      },

      frameGeneration: {
        type: [String],
        default: [],
      },

      encoding: {
        type: [String],
        default: [],
      },

      latencyTechnology: {
        type: [String],
        default: [],
      },

      rayTracingSupport: {
        type: Boolean,
        default: false,
      },
    },

    // =========================
    // AI Capabilities
    // =========================
    aiCapabilities: {
      cuda: {
        type: Boolean,
        default: false,
      },

      rocm: {
        type: Boolean,
        default: false,
      },

      tensorCores: {
        type: Boolean,
        default: false,
      },

      aiAccelerators: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const GPU = mongoose.model("GPU", gpuSchema);

module.exports = GPU;