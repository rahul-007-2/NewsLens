import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("naive_bayes");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const models = [
    {
      id: "naive_bayes",
      name: "Naive Bayes",
      description: "Fast probabilistic classifier",
      icon: "◈",
    },
    {
      id: "svm",
      name: "Linear SVM",
      description: "Strong text classification",
      icon: "◇",
    },
    {
      id: "logistic",
      name: "Logistic Regression",
      description: "Interpretable linear model",
      icon: "◎",
    },
  ];

  const handleSubmit = async () => {
  if (!text.trim()) return;

  console.log("Sending prediction request...");
  console.log("API URL:", "https://newslens-mxdh.onrender.com/predict");
  console.log("Model:", model);

  try {
    const response = await fetch(
      "https://newslens-mxdh.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          model: model,
        }),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response OK:", response.ok);

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (!response.ok) {
      throw new Error(
        `Backend returned ${response.status}: ${responseText}`
      );
    }

    const data = JSON.parse(responseText);

    console.log("Prediction:", data);

    setResult(data);
  } catch (error) {
    console.error("FULL PREDICTION ERROR:", error);

    setResult({
      error: error.message,
    });
  }
};

  const selectedModel = models.find((item) => item.id === model);

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <span>News<span>Lens</span></span>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          AI MODEL ONLINE
        </div>
      </nav>

      <main className="container">

        {/* HERO */}
        <section className="hero">
          <div className="eyebrow">
            <span>✦</span>
            MACHINE LEARNING • NLP
          </div>

          <h1>
            Separate signal
            <br />
            from <span>noise.</span>
          </h1>

          <p>
            Analyze news content with machine learning models and
            identify whether a story is likely to be real or fake.
          </p>
        </section>

        {/* MAIN CARD */}
        <section className="analyzer-card">

          <div className="card-header">
            <div>
              <div className="section-label">01 / INPUT</div>
              <h2>Analyze an article</h2>
            </div>

            <div className="secure-badge">
              <span>●</span> LOCAL INFERENCE
            </div>
          </div>

          <div className="input-wrapper">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a news headline or article here..."
              maxLength={5000}
            />

            <div className="input-footer">
              <span>
                {text.length.toLocaleString()} / 5,000 characters
              </span>

              {text.length > 0 && (
                <button
                  className="clear-button"
                  onClick={() => {
                    setText("");
                    setResult(null);
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* MODEL SELECTION */}
          <div className="model-section">
            <div className="section-label">02 / MODEL</div>

            <div className="model-grid">
              {models.map((item) => (
                <button
                  key={item.id}
                  className={`model-card ${
                    model === item.id ? "selected" : ""
                  }`}
                  onClick={() => setModel(item.id)}
                >
                  <div className="model-top">
                    <div className="model-icon">{item.icon}</div>

                    <div
                      className={`radio ${
                        model === item.id ? "active" : ""
                      }`}
                    >
                      {model === item.id && <span></span>}
                    </div>
                  </div>

                  <div className="model-name">{item.name}</div>

                  <div className="model-description">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ACTION */}
          <button
            className={`analyze-button ${
              loading ? "loading" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                ANALYZING...
              </>
            ) : (
              <>
                Analyze article
                <span className="arrow">↗</span>
              </>
            )}
          </button>
        </section>

        {/* RESULT */}
        {result && !result.error && (
          <section className="result-card">

            <div className="result-header">
              <div>
                <div className="section-label">03 / RESULT</div>
                <h2>Analysis complete</h2>
              </div>

              <div className="model-used">
                {selectedModel?.name}
              </div>
            </div>

            <div className="result-content">

              <div className="prediction">
                <span className="prediction-label">
                  CLASSIFICATION
                </span>

                <h3>{result.prediction}</h3>

                <div className="prediction-line"></div>
              </div>

              {result.confidence !== null &&
                result.confidence !== undefined && (
                  <div className="confidence">
                    <div className="confidence-header">
                      <span>MODEL CONFIDENCE</span>
                      <strong>
                        {(result.confidence * 100).toFixed(1)}%
                      </strong>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${result.confidence * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
            </div>
          </section>
        )}

        {result?.error && (
          <div className="error-card">
            <span>!</span>
            {result.error}
          </div>
        )}

        {/* FOOTER */}
        <footer>
          <span>NewsLens</span>
          <span>Built with React + Machine Learning</span>
        </footer>

      </main>
    </div>
  );
}

export default App;