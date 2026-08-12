import { useState } from "react";
import "./interview.css";
import "./loading.css";

function Interview({ setPage, setRecommendation }) {
  const [step, setStep] = useState(1);

  const [requirements, setRequirements] = useState({
    budget: "",
    useCase: "",
    resolution: "",
    minVram: "",
    needsCUDA: false,
    needsRayTracing: false,
  });

const [loading, setLoading] = useState(false);

  // Save an answer
  const updateRequirement = (field, value) => {
    setRequirements((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Move to next question
  const nextStep = () => {
    setStep((previous) => previous + 1);
  };

  // Send final requirements to backend
  const getRecommendation = async (finalRequirements) => {
    try {
      setLoading(true);
      console.log("Final requirements:", finalRequirements);

      const params = new URLSearchParams({
        budget: finalRequirements.budget,
        useCase: finalRequirements.useCase,
        resolution: finalRequirements.resolution,
        minVram: finalRequirements.minVram,
        needsCUDA: finalRequirements.needsCUDA,
        needsRayTracing: finalRequirements.needsRayTracing,
      });

      const response = await fetch(
        `http://localhost:5000/api/gpus/recommend?${params}`
      );

      const data = await response.json();

      console.log("RECOMMENDATION:", data);

      if (data.status === "OK") {
        // Store recommendation in App
        setRecommendation(data.data);
        setLoading(false);

        // Move to Results page
        setPage("results");
      } else {
        console.error("Recommendation failed:", data);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

if (loading) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <span className="loader-label">FINDING YOUR GPU</span>
    </div>
  );
}

  return (
    <main className="interview-page">

      {/* Progress */}
      <div className="interview-header">
        <span className="step">
          {String(step).padStart(2, "0")} / 06
        </span>

        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${(step / 6) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* ================= QUESTION 1 ================= */}

      {step === 1 && (
        <div className="question-container">

          <p className="question-label">
            LET'S START WITH THE BASICS
          </p>

          <h1>
            What's your budget?
          </h1>

          <p className="question-description">
            What's the maximum amount you're willing
            to spend on your GPU?
          </p>

          <div className="budget-input">
            <span>$</span>

            <input
              type="number"
              placeholder="500"
              value={requirements.budget}
              onChange={(e) =>
                updateRequirement("budget", e.target.value)
              }
            />
          </div>

          <button
            className="next-button"
            disabled={!requirements.budget}
            onClick={nextStep}
          >
            Continue →
          </button>

        </div>
      )}

      {/* ================= QUESTION 2 ================= */}

      {step === 2 && (
        <div className="question-container">

          <p className="question-label">
            WHAT ARE YOU USING IT FOR?
          </p>

          <h1>
            What's your main use?
          </h1>

          <p className="question-description">
            This helps us understand what features
            matter most to you.
          </p>

          <div className="options">

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("useCase", "gaming");
                nextStep();
              }}
            >
              Gaming
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("useCase", "ai");
                nextStep();
              }}
            >
              AI / Machine Learning
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("useCase", "productivity");
                nextStep();
              }}
            >
              Productivity / Work
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("useCase", "gaming-ai");
                nextStep();
              }}
            >
              Gaming + AI
            </button>

          </div>
        </div>
      )}

      {/* ================= QUESTION 3 ================= */}

      {step === 3 && (
        <div className="question-container">

          <p className="question-label">
            GAMING PERFORMANCE
          </p>

          <h1>
            What resolution do you use?
          </h1>

          <p className="question-description">
            If you're not primarily gaming, choose
            the resolution you expect to use.
          </p>

          <div className="options">

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("resolution", "1080p");
                nextStep();
              }}
            >
              1080p
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("resolution", "1440p");
                nextStep();
              }}
            >
              1440p
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("resolution", "4k");
                nextStep();
              }}
            >
              4K
            </button>

          </div>
        </div>
      )}

      {/* ================= QUESTION 4 ================= */}

      {step === 4 && (
        <div className="question-container">

          <p className="question-label">
            GPU MEMORY
          </p>

          <h1>
            How much VRAM do you need?
          </h1>

          <p className="question-description">
            Choose the minimum amount of VRAM
            you want your GPU to have.
          </p>

          <div className="options">

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("minVram", 8);
                nextStep();
              }}
            >
              8 GB
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("minVram", 12);
                nextStep();
              }}
            >
              12 GB
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("minVram", 16);
                nextStep();
              }}
            >
              16 GB
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("minVram", 24);
                nextStep();
              }}
            >
              24 GB+
            </button>

          </div>
        </div>
      )}

      {/* ================= QUESTION 5 ================= */}

      {step === 5 && (
        <div className="question-container">

          <p className="question-label">
            AI / CUDA
          </p>

          <h1>
            Do you need CUDA?
          </h1>

          <p className="question-description">
            CUDA is important for many AI and
            machine-learning workloads.
          </p>

          <div className="options">

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("needsCUDA", true);
                nextStep();
              }}
            >
              Yes, I need CUDA
            </button>

            <button
              className="option-button"
              onClick={() => {
                updateRequirement("needsCUDA", false);
                nextStep();
              }}
            >
              No, I don't need CUDA
            </button>

          </div>
        </div>
      )}

      {/* ================= QUESTION 6 ================= */}

      {step === 6 && (
        <div className="question-container">

          <p className="question-label">
            RAY TRACING
          </p>

          <h1>
            Is ray tracing important to you?
          </h1>

          <p className="question-description">
            Ray tracing can improve lighting and
            reflections in supported games.
          </p>

          <div className="options">

            {/* YES */}

            <button
              className="option-button"
              onClick={() => {
                const finalRequirements = {
                  ...requirements,
                  needsRayTracing: true,
                };

                getRecommendation(finalRequirements);
              }}
            >
              Yes, it's important
            </button>

            {/* NO */}

            <button
              className="option-button"
              onClick={() => {
                const finalRequirements = {
                  ...requirements,
                  needsRayTracing: false,
                };

                getRecommendation(finalRequirements);
              }}
            >
              Not important
            </button>

          </div>
        </div>
      )}

    </main>
  );
}

export default Interview;