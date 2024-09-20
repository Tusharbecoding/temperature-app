from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define a request model
class Submission(BaseModel):
    submittedValue: str

# Define an endpoint to accept POST requests and return the predicted temperature
@app.post("/predict")
async def predict_temperature(submission: Submission):
    # Simulate the temperature prediction (fixed at 50°C)
    random_number = random.randint(1, 100)
    return {"submittedValue": submission.submittedValue, "predictedTemp": random_number}

