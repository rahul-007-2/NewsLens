📰 NewsLens – Text Classification App
📌 Overview
NewsLens is a text classification project built with Python (FastAPI backend) and React (frontend).
It demonstrates how to preprocess text using TF‑IDF, train multiple machine learning models (Naive Bayes, Linear SVM, Logistic Regression), and expose them via an API.
The frontend allows users to input text, choose a model, and view predictions along with confidence scores.

⚙️ ML Pipeline
The machine learning pipeline follows best practices to avoid data leakage:

Dataset Preparation

Collect text data with binary/multi‑class labels.

Example: spam detection, sentiment analysis, news categorization.

Train/Test Split

Use train_test_split with stratify=y to ensure balanced label distribution.

Example: 80% training, 20% testing.

TF‑IDF Vectorization

Fit TF‑IDF only on training data.

Transform both training and test sets using the same vectorizer.

Model Training

Train multiple classifiers:

Naive Bayes (MultinomialNB) – fast baseline for text.

Linear SVM (LinearSVC) – strong performance on sparse data.

Logistic Regression – interpretable and probabilistic.

Model Saving

Save trained models and vectorizer as .pkl files using joblib.

Example: nb_model.pkl, svm_model.pkl, logreg_model.pkl, vectorizer.pkl.

Backend API (FastAPI)

Loads models and vectorizer.

Exposes /predict endpoint.

Accepts JSON input: { "text": "...", "model": "naive_bayes" }.

Returns prediction + confidence score.

Frontend (React)

Simple UI with:

Text input box.

Dropdown to select model.

Button to submit.

Display of prediction + confidence score.

🛠️ Tech Stack
Backend: FastAPI, Uvicorn, Scikit‑learn, Joblib

Frontend: React, Fetch API

Data Processing: Pandas, Scikit‑learn (TF‑IDF)

🚀 Setup Instructions
Backend
bash
cd backend
python -m venv .venv
source .venv/bin/activate # Linux/Mac
.venv\Scripts\activate # Windows
pip install -r requirements.txt
python train_models.py # trains and saves .pkl files
python -m uvicorn app:app --reload
Backend runs at: http://localhost:8000

Frontend
bash
cd frontend
npm install
npm start
Frontend runs at: http://localhost:3000

📊 Example API Request
POST /predict

json
{
"text": "Win a free iPhone today!",
"model": "naive_bayes"
}
Response

json
{
"prediction": 1,
"confidence": 0.92
}
🔑 Features
Multiple model support (Naive Bayes, SVM, Logistic Regression).

Confidence scores for predictions.

Clean separation of backend (API) and frontend (UI).

Easy reproducibility with requirements.txt.
