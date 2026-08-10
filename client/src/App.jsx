import "./App.css";
import { useState } from "react";
import Interview from "./pages/interview";
import Results from "./pages/Result";

function App() {
  const [page, setPage] = useState("home");
  const [recommendation, setRecommendation] = useState(null);

  // Interview page
  if (page === "interview") {
    return (
      <Interview
        setPage={setPage}
        setRecommendation={setRecommendation}
      />
    );
  }

  // Results page
  if (page === "results") {
    return (
      <Results
        recommendation={recommendation}
        setPage={setPage}
      />
    );
  }

  // Landing page
  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          GPU<span>WISE</span>
        </div>

        <button className="about-button">
          About
        </button>
      </header>

      <main className="hero">

        <div className="hero-content">

          <div className="eyebrow">
            AI-POWERED GPU RECOMMENDATIONS
          </div>

          <h1>
            Find the GPU
            <br />
            that's right for you.
          </h1>

          <p className="hero-description">
            Tell us what you need, what you're willing to spend,
            and how you plan to use your GPU.
          </p>

          <button
            className="start-button"
            onClick={() => setPage("interview")}
          >
            Find My GPU
            <span>→</span>
          </button>

        </div>

      </main>

      <footer className="footer">
        <span>GPUWISE</span>
        <span>Built for smarter GPU decisions.</span>
      </footer>

    </div>
  );
}

export default App;