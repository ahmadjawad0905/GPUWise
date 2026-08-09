const filterGPUs = (gpus, requirements) => {

    let filteredGPUs = gpus;

    // Budget
    if (requirements.budget) {
    filteredGPUs = filteredGPUs.filter(gpu => {

        const price =
            gpu.pricing.currentPrice ??
            gpu.pricing.launchMSRP;

        return price !== null &&
               price <= requirements.budget;
    });
}

    // Minimum VRAM
    if (requirements.minVram) {
        filteredGPUs = filteredGPUs.filter(
            gpu => gpu.memory.vramGB >= requirements.minVram
        );
    }

    // CUDA requirement
    if (requirements.needsCUDA) {
        filteredGPUs = filteredGPUs.filter(
            gpu => gpu.aiCapabilities.cuda === true
        );
    }

    // Ray tracing requirement
    if (requirements.needsRayTracing) {
        filteredGPUs = filteredGPUs.filter(
            gpu => gpu.software.rayTracingSupport === true
        );
    }

    // Availability requirement
    if (requirements.onlyAvailable) {
        filteredGPUs = filteredGPUs.filter(
            gpu => gpu.availability === "in production"
        );
    }

    return filteredGPUs;
};

module.exports = filterGPUs;