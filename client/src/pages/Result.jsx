import "../App.css";

function Results({ recommendation, setPage }) {
  if (!recommendation) {
    return (
      <main className="results-page">
        <h1>No recommendation found.</h1>

        <button
          className="start-button"
          onClick={() => setPage("interview")}
        >
          Start Interview →
        </button>
      </main>
    );
  }

  console.log("Results data:", recommendation);

  const result = recommendation.recommendation;

  const recommendedGPU = result?.recommendedGPU;
  const alternativeGPU = result?.alternativeGPU;
  const summary = result?.summary;

  return (
    <main className="results-page">

      {/* Header */}

      <div className="results-header">

        <p className="eyebrow">
          YOUR GPUWISE RECOMMENDATION
        </p>

        <h1>
          We found your GPU.
        </h1>

        <p>
          Based on your requirements and the GPUs
          available in our database.
        </p>

      </div>


      {/* ================= RECOMMENDED GPU ================= */}

      {recommendedGPU && (
        <section className="recommendation-card">

          <p className="card-label">
            BEST MATCH
          </p>

          <h2>
            {recommendedGPU.brand} {recommendedGPU.model}
          </h2>

          <p>
            {recommendedGPU.tier} · {recommendedGPU.architecture}
          </p>


          {/* Specs */}

          <div className="gpu-specs">

            <div className="spec">
              <span>VRAM</span>
              <strong>
                {recommendedGPU?.keySpecs?.vram ?? "N/A"} GB
              </strong>
            </div>

            <div className="spec">
              <span>Memory</span>
              <strong>
                {recommendedGPU?.keySpecs?.memoryType ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>CUDA Cores</span>
              <strong>
                {recommendedGPU?.keySpecs?.cudaCores ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>RT Cores</span>
              <strong>
                {recommendedGPU?.keySpecs?.rtCores ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>Memory Bandwidth</span>
              <strong>
                {recommendedGPU?.keySpecs?.memoryBandwidth ?? "N/A"}
              </strong>
            </div>

          </div>


          {/* Recommendation explanation */}

          <div className="summary">

            <h3>
              Why we recommend it
            </h3>

            <p>
              {summary}
            </p>

          </div>

        </section>
      )}


      {/* ================= ALTERNATIVE ================= */}

      {alternativeGPU && (
        <section className="alternative-card">

          <p className="card-label">
            ALTERNATIVE
          </p>

          <h2>
            {alternativeGPU.brand} {alternativeGPU.model}
          </h2>

          <p>
            {alternativeGPU.tier} · {alternativeGPU.architecture}
          </p>


          <div className="gpu-specs">

            <div className="spec">
              <span>VRAM</span>
              <strong>
                {alternativeGPU.memory?.vramGB ?? "N/A"} GB
              </strong>
            </div>

            <div className="spec">
              <span>Memory</span>
              <strong>
                {alternativeGPU.memory?.memoryType ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>CUDA Cores</span>
              <strong>
                {alternativeGPU.compute?.cudaCores ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>RT Cores</span>
              <strong>
                {alternativeGPU.compute?.rtCores ?? "N/A"}
              </strong>
            </div>

            <div className="spec">
              <span>Power</span>
              <strong>
                {alternativeGPU.power?.tdpWatts ?? "N/A"} W
              </strong>
            </div>

          </div>

        </section>
      )}


      {/* ================= CANDIDATES ================= */}

      {recommendation.candidates?.length > 0 && (
        <section className="candidates-section">

          <h2>
            GPUs considered
          </h2>

          <div className="candidate-grid">

            {recommendation.candidates.map((gpu) => (
              <div
                className="candidate-card"
                key={gpu._id || gpu.slug || gpu.model}
              >

                <h3>
                  {gpu.brand} {gpu.model}
                </h3>

                <p>
                  {gpu.memory?.vramGB ?? "N/A"} GB VRAM
                </p>

                <p>
                  {gpu.tier}
                </p>

              </div>
            ))}

          </div>

        </section>
      )}


      {/* ================= START AGAIN ================= */}

      <button
        className="start-button"
        onClick={() => setPage("interview")}
      >
        Start Again →
      </button>

    </main>
  );
}

export default Results;