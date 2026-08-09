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
        aiCapabilities: gpu.aiCapabilities,
        availability: gpu.availability
    }));

    // 5. Create the prompt for Gemini
    const prompt = `
You are GPUWise, a GPU recommendation assistant.

Your job is to recommend the most suitable GPU from the candidates provided.

IMPORTANT RULES:
- Only recommend GPUs from the candidate list.
- Use only the information provided below.
- Do not invent specifications, prices, benchmarks, or features.
- Do not recommend a GPU that is not in the candidate list.
- Consider the user's requirements carefully.
- Explain why the recommendation fits the user.
- Mention important trade-offs or limitations.
- If a GPU is discontinued or its current price is unknown, mention that when relevant.

USER REQUIREMENTS:
${JSON.stringify(requirements, null, 2)}

CANDIDATE GPUs:
${JSON.stringify(candidates, null, 2)}

Return your recommendation in a clear and concise way.
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