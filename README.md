# 📰 NewsLens – Multi-Model Fake News Classification

NewsLens is an **AI-powered fake news classification web application** built with **React, FastAPI, and Scikit-learn**.

The application analyzes a news headline or article using multiple machine learning models and predicts whether the content is **likely to be real or fake**. Users can select between different classification algorithms and view the model's prediction along with its confidence score.

> **Note:** Model confidence represents the classifier's confidence in its prediction and should not be interpreted as definitive proof that a news article is true or false.

---

## ✨ Features

- 🧠 **Multiple Machine Learning Models**

  - Multinomial Naive Bayes
  - Linear Support Vector Machine
  - Logistic Regression

- 📝 **News Text Classification**

  - Analyze headlines or full news articles
  - TF-IDF based text representation

- 📊 **Confidence Scores**

  - Displays the model's confidence for each prediction

- 🔄 **Model Selection**

  - Compare predictions from different classifiers

- ⚡ **FastAPI Backend**

  - REST API for model inference
  - Lightweight and scalable architecture

- 🎨 **Modern React Frontend**

  - Responsive interface
  - Interactive model selection
  - Real-time prediction results

- 🚀 **Cloud Deployment**

  - Frontend deployed using Render
  - Backend can be deployed independently as an API service

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    │  News Article/Text   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  • Text Input       │
                    │  • Model Selection  │
                    │  • Results UI       │
                    └──────────┬──────────┘
                               │
                         HTTP POST /predict
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    │                     │
                    │  • Request Handling │
                    │  • TF-IDF Transform │
                    │  • Model Inference  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
          ┌──────────┐   ┌──────────┐   ┌──────────┐
          │  Naive   │   │  Linear  │   │ Logistic │
          │  Bayes   │   │   SVM    │   │Regression│
          └────┬─────┘   └────┬─────┘   └────┬─────┘
               │              │              │
               └──────────────┼──────────────┘
                              ▼
                    ┌─────────────────────┐
                    │ Prediction +        │
                    │ Confidence Score    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Results UI  │
                    └─────────────────────┘
```

---

# 🤖 Machine Learning Pipeline

NewsLens follows a structured machine learning pipeline designed to reduce data leakage and maintain reproducibility.

## 1. Dataset Preparation

The system is trained on a labeled text dataset containing news content and corresponding classification labels.

The dataset is processed using **Pandas** before being passed into the machine learning pipeline.

---

## 2. Train/Test Split

The dataset is divided into training and testing sets using `train_test_split`.

Stratification is used to preserve the distribution of classes:

```python
train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,
    random_state=42
)
```

This ensures that both training and testing sets maintain a representative class distribution.

---

## 3. TF-IDF Vectorization

Raw text cannot be directly processed by traditional machine learning classifiers.

NewsLens converts text into numerical feature vectors using **TF-IDF (Term Frequency–Inverse Document Frequency)**.

The vectorizer is fitted **only on the training data**:

```text
Training Text
      │
      ▼
TF-IDF Fit
      │
      ▼
Numerical Feature Matrix
```

The same fitted vectorizer is then used to transform the test data and incoming user text.

This prevents information from the test set from leaking into the training process.

---

## 4. Model Training

NewsLens supports three classification algorithms.

### Multinomial Naive Bayes

A probabilistic classifier that performs particularly well for many text classification problems.

**Advantages:**

- Fast training
- Fast inference
- Works well with sparse TF-IDF features
- Strong baseline for text classification

---

### Linear SVM

A linear Support Vector Machine designed for high-dimensional classification problems.

**Advantages:**

- Effective for sparse text data
- Strong classification performance
- Handles high-dimensional feature spaces efficiently

---

### Logistic Regression

A linear classification model that provides probabilistic predictions.

**Advantages:**

- Interpretable
- Efficient
- Provides probability estimates
- Strong baseline for text classification

---

# 🔬 Model Artifacts

After training, the required machine learning artifacts are serialized using **Joblib**.

```text
backend/
│
├── nb_model.pkl
├── svm_model.pkl
├── logreg_model.pkl
└── vectorizer.pkl
```

The FastAPI application loads these artifacts when the backend starts.

---

# 🔌 API

NewsLens exposes a REST API through FastAPI.

## `POST /predict`

Accepts a news article or headline and the selected machine learning model.

### Request

```json
{
  "text": "Win a free iPhone today!",
  "model": "naive_bayes"
}
```

### Supported Models

| Model               | API Value     |
| ------------------- | ------------- |
| Naive Bayes         | `naive_bayes` |
| Linear SVM          | `svm`         |
| Logistic Regression | `logistic`    |

### Response

```json
{
  "prediction": 1,
  "confidence": 0.92
}
```

Where:

- `prediction` represents the predicted class
- `confidence` represents the classifier's confidence score

The exact meaning of the class labels depends on the labels used in the training dataset.

---

# 🛠️ Tech Stack

## Frontend

- **React**
- JavaScript
- HTML5
- CSS3
- Fetch API

## Backend

- **Python**
- **FastAPI**
- **Uvicorn**

## Machine Learning

- **Scikit-learn**
- **Pandas**
- **TF-IDF**
- Multinomial Naive Bayes
- Linear SVM
- Logistic Regression

## Model Persistence

- **Joblib**

## Deployment

- **Render**

---

# 📁 Project Structure

```text
NewsLens/
│
├── backend/
│   ├── app.py
│   ├── train_models.py
│   ├── requirements.txt
│   │
│   ├── nb_model.pkl
│   ├── svm_model.pkl
│   ├── logreg_model.pkl
│   └── vectorizer.pkl
│
├── frontend/
│   ├── public/
│   │   └── ...
│   │
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Running the Project

## Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Train the models:

```bash
python train_models.py
```

Start the FastAPI server:

```bash
python -m uvicorn app:app --reload
```

The API will then be available through the configured backend deployment or development environment.

---

# 💻 Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend communicates with the FastAPI `/predict` endpoint.

---

# ☁️ Deployment

NewsLens is designed with a separate frontend and backend architecture.

```text
                 ┌──────────────────────┐
                 │       User           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  React Frontend      │
                 │      Render          │
                 └──────────┬───────────┘
                            │
                       API Request
                            │
                            ▼
                 ┌──────────────────────┐
                 │  FastAPI Backend     │
                 │      Render          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ ML Models + TF-IDF   │
                 └──────────────────────┘
```

## Frontend Deployment

The React frontend can be deployed as a **Static Site on Render**.

Typical build configuration:

```text
Build Command:
npm install && npm run build

Publish Directory:
build
```

The frontend should use the deployed backend API URL through an environment variable rather than a hard-coded development address.

For example:

```env
REACT_APP_API_URL=<your-backend-api-url>
```

Then the application can make requests using:

```javascript
fetch(`${process.env.REACT_APP_API_URL}/predict`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text,
    model,
  }),
});
```

---

# 📊 Example Workflow

A typical NewsLens prediction follows this process:

```text
User enters news article
          │
          ▼
React sends POST request
          │
          ▼
FastAPI receives text
          │
          ▼
TF-IDF vectorization
          │
          ▼
Selected ML model
          │
          ▼
Prediction generated
          │
          ▼
Confidence calculated
          │
          ▼
Result returned to React
          │
          ▼
Prediction displayed
```

---

# 🔐 Data Leakage Prevention

A key aspect of the implementation is ensuring that the TF-IDF vectorizer does not learn from the test set.

Incorrect:

```text
Entire Dataset
      ↓
TF-IDF
      ↓
Train/Test Split
```

Correct:

```text
Dataset
   │
   ▼
Train/Test Split
   │
   ├───────────────┐
   ▼               ▼
Training Data    Test Data
   │               │
   ▼               │
TF-IDF Fit         │
   │               │
   ▼               ▼
Transform       Transform
   │               │
   └───────┬───────┘
           ▼
       ML Model
```

This prevents information from the test set from influencing the learned vocabulary and IDF statistics.

---

# 📈 Future Improvements

Potential improvements to NewsLens include:

- [ ] Add model accuracy and F1-score comparison
- [ ] Add confusion matrices for each classifier
- [ ] Add prediction history
- [ ] Add explainable AI / important-word analysis
- [ ] Add probability comparison between classes
- [ ] Support larger news articles
- [ ] Add additional machine learning models
- [ ] Experiment with transformer-based models such as BERT
- [ ] Add automated model retraining
- [ ] Add dataset statistics dashboard
- [ ] Add multilingual news classification
- [ ] Improve detection of emerging misinformation patterns

---

# ⚠️ Limitations

NewsLens is a **machine learning classification system**, not a fact-checking engine.

A prediction does not establish whether a claim is objectively true or false. The model learns statistical patterns from its training data and may fail when presented with:

- New topics not represented in the dataset
- Satire or parody
- Highly nuanced reporting
- Breaking news
- Manipulated or adversarial text
- Writing styles significantly different from the training data

Therefore, predictions should be treated as **model-generated assessments rather than factual verification**.

---

# 🎯 Project Goals

NewsLens was developed to demonstrate the practical implementation of a complete machine learning application:

```text
Dataset
   ↓
Data Preprocessing
   ↓
Feature Engineering
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Serialization
   ↓
FastAPI
   ↓
React
   ↓
Cloud Deployment
```

The project combines **machine learning, backend API development, frontend engineering, and deployment** into a single end-to-end application.

---

# 👨‍💻 Author

**NewsLens** — Multi-Model Fake News Classification System

Built with:

**React · FastAPI · Scikit-learn · TF-IDF · Python · Render**
