from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://newslens-mxdh.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models + vectorizer
vectorizer = joblib.load("vectorizer.pkl")
models = {
    "naive_bayes": joblib.load("nb_model.pkl"),
    "svm": joblib.load("svm_model.pkl"),
    "logistic": joblib.load("logistic_model.pkl")
}

class PredictRequest(BaseModel):
    text: str
    model: str  # which model to use

@app.post("/")
def predict(request: PredictRequest):
    if request.model not in models:
        return {"error": "Invalid model choice"}

    model = models[request.model]
    vector = vectorizer.transform([request.text])
    prediction = model.predict(vector)[0]

    # Confidence score (probability if available)
    if hasattr(model, "predict_proba"):
        confidence = np.max(model.predict_proba(vector))
    elif hasattr(model, "decision_function"):
        # Convert decision function to pseudo-confidence
        score = model.decision_function(vector)[0]
        confidence = 1 / (1 + np.exp(-score))  # sigmoid
    else:
        confidence = None
    if(int(prediction)==1):
        return {"prediction": 'True', "confidence": float(confidence) if confidence else None}
    else:
        return {"prediction": 'False', "confidence": float(confidence) if confidence else None}
    
