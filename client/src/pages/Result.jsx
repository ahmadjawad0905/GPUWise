import "./Result.css";

function Results({ recommendation, setPage }) {

  // No data — fallback
  if (!recommendation) {
    return (
      <main className="no-results">
        <h1>No recommendation found.</h1>
        <button
          className="restart-button"
          onClick={() => setPage("interview")}
        >
          Try Again <span>→</span>
        </button>
      </main>
    );
  }

  const result = recommendation.recommendation;
  const recommendedGPU = result?.recommendedGPU;
  const alternativeGPU = result?.alternativeGPU;
  const summary = result?.summary;
  const candidates = recommendation.candidates;

  // Build a filtered array of specs from Gemini's keySpecs
  const buildSpecs = (keySpecs) => {
    if (!keySpecs) return [];

    return [
      { label: "VRAM", value: keySpecs.vram },
      { label: "Memory", value: keySpecs.memoryType },
      { label: "Bandwidth", value: keySpecs.memoryBandwidth },
      { label: "CUDA Cores", value: keySpecs.cudaCores },
      { label: "RT Cores", value: keySpecs.rtCores },
      { label: "Tensor Cores", value: keySpecs.tensorCores },
      { label: "TDP", value: keySpecs.tdp ? `${keySpecs.tdp}W` : null },
    ].filter(
      (s) => s.value != null && s.value !== "" && s.value !== 0
    );
  };


  return (
    <main className="results-page">

      {/* ---- Header ---- */}

      <header className="results-header">
        <p className="results-eyebrow">
          YOUR RECOMMENDATION
        </p>
        <h1>We found your GPU.</h1>
        <p className="results-subtitle">
          Based on your requirements and our GPU database.
        </p>
      </header>


      {/* ---- Recommended GPU ---- */}

      {recommendedGPU && (
        <section className="gpu-card primary">

          <span className="card-badge">BEST MATCH</span>
          <h2 className="gpu-model">{recommendedGPU.model}</h2>

          {/* Specs */}
          {buildSpecs(recommendedGPU.keySpecs).length > 0 && (
            <div className="specs-row">
              {buildSpecs(recommendedGPU.keySpecs).map((spec, i) => (
                <div className="spec-item" key={i}>
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Why */}
          {recommendedGPU.reason && (
            <div className="reason-section">
              <h3>Why this GPU</h3>
              <p>{recommendedGPU.reason}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(recommendedGPU.pros?.length > 0 ||
            recommendedGPU.cons?.length > 0) && (
            <div className="pros-cons-row">

              {recommendedGPU.pros?.length > 0 && (
                <div className="pros-list">
                  <h4>PROS</h4>
                  <ul>
                    {recommendedGPU.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendedGPU.cons?.length > 0 && (
                <div className="cons-list">
                  <h4>CONS</h4>
                  <ul>
                    {recommendedGPU.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

        </section>
      )}


      {/* ---- Alternative GPU ---- */}

      {alternativeGPU && (
        <section className="gpu-card secondary">

          <span className="card-badge">ALTERNATIVE</span>
          <h2 className="gpu-model">{alternativeGPU.model}</h2>

          {/* Specs */}
          {buildSpecs(alternativeGPU.keySpecs).length > 0 && (
            <div className="specs-row">
              {buildSpecs(alternativeGPU.keySpecs).map((spec, i) => (
                <div className="spec-item" key={i}>
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Why */}
          {alternativeGPU.reason && (
            <div className="reason-section">
              <h3>Why consider this</h3>
              <p>{alternativeGPU.reason}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(alternativeGPU.pros?.length > 0 ||
            alternativeGPU.cons?.length > 0) && (
            <div className="pros-cons-row">

              {alternativeGPU.pros?.length > 0 && (
                <div className="pros-list">
                  <h4>PROS</h4>
                  <ul>
                    {alternativeGPU.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}

              {alternativeGPU.cons?.length > 0 && (
                <div className="cons-list">
                  <h4>CONS</h4>
                  <ul>
                    {alternativeGPU.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

        </section>
      )}


      {/* ---- Summary ---- */}

      {summary && (
        <section className="summary-section">
          <h3>Summary</h3>
          <p>{summary}</p>
        </section>
      )}


      {/* ---- Candidates Considered ---- */}

      {candidates?.length > 0 && (
        <section className="candidates-section">
          <h3>ALL GPUs CONSIDERED</h3>

          <div className="candidate-grid">
            {candidates.map((gpu, i) => (
              <div className="candidate-chip" key={i}>
                <h4>
                  {gpu.brand} {gpu.model}
                </h4>
                <p>
                  {gpu.memory?.vramGB}GB {gpu.memory?.memoryType} · {gpu.tier}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ---- Start Again ---- */}

      <div className="restart-section">
        <button
          className="restart-button"
          onClick={() => setPage("interview")}
        >
          Start Again <span>→</span>
        </button>
      </div>

    </main>
  );
}

export default Results;