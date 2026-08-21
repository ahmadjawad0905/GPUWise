const GPU = require("../models/GPU");
const filterGPUs = require("./gpuFilterService");
const askGemini = require("./geminiService");

const recommendGPUs = async (requirements) => {

    // 1. Get all GPUs from MongoDB
    const gpus = await GPU.find();

    // 2. Apply hard filters
    const filteredGPUs = filterGPUs(gpus, requirements);

    // 3. If nothing survives the hard filters
    if (filteredGPUs.length === 0) {
        return {
            recommendation: null,
            candidates: [],
            message: "No GPUs match the user's requirements."
        };
    }

    // 4. Keep only information useful for recommendation
    const candidates = filteredGPUs.map(gpu => ({
        brand: gpu.brand,
        model: gpu.model,
        tier: gpu.tier,
        architecture: gpu.architecture,
        memory: gpu.memory,
        compute: gpu.compute,
        pricing: gpu.pricing,
        performance: gpu.performance,
        software: gpu.software,
        aiCapabilities: gpu.aiCapabilities
    }));

    // 5. Create the prompt for Gemini
    const prompt = `
You are GPUWise, a GPU recommendation assistant.

Your job is to select the best GPU and one alternative from the provided candidate GPUs.

IMPORTANT RULES:

1. ONLY recommend GPUs from the candidate list.
2. Do NOT invent specifications, prices, benchmarks, features, or capabilities.
3. The recommended GPU must satisfy the user's hard requirements.
4. The alternative GPU must also satisfy the user's hard requirements.
5. If there is only one candidate, alternativeGPU must be null.
6. If there are no suitable candidates, recommendedGPU must be null.
7. Consider the user's use case when deciding between candidates.
8. Use the supplied GPU data as the only source of GPU specifications.
9. Do not use launch MSRP as the current price.
10. If currentPrice seems unusually low, note it may reflect used market pricing.
11. Keep pros and cons specific to the supplied GPU data.

USER REQUIREMENTS:
${JSON.stringify(requirements, null, 2)}

CANDIDATE GPUs:
${JSON.stringify(candidates, null, 2)}

Return ONLY valid JSON using exactly this structure:

{
    "recommendedGPU": {
        "model": "",
        "slug": "",
        "reason": "",
        "keySpecs": {
            "vram": "",
            "memoryType": "",
            "memoryBandwidth": "",
            "cudaCores": null,
            "rtCores": null,
            "tensorCores": null,
            "tdp": null
        },
        "pros": [],
        "cons": []
    },

    "alternativeGPU": {
        "model": "",
        "slug": "",
        "reason": "",
        "keySpecs": {
            "vram": "",
            "memoryType": "",
            "memoryBandwidth": "",
            "cudaCores": null,
            "rtCores": null,
            "tensorCores": null,
            "tdp": null
        },
        "pros": [],
        "cons": []
    },

    "summary": ""
}

If there is no alternative candidate, return:

"alternativeGPU": null

If there are no candidates, return:

"recommendedGPU": null,
"alternativeGPU": null

and explain why in "summary".
`;

    // 6. Ask Gemini to reason about the candidates
    const recommendation = await askGemini(prompt);

    // 7. Return everything
    return {
        recommendation,
        candidates
    };
};

module.exports = recommendGPUs;