from fastapi import FastAPI
from pydantic import BaseModel,Field,computed_field
from typing import Literal,Annotated
import pickle
import joblib
import pandas as pd
from fastapi.responses import JSONResponse
from pathlib import Path

#importing the ml model

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "heart_disease_model.pkl"

model = joblib.load(MODEL_PATH)


app=FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://heart-disease-prediction-bice-nu.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Pydantic model to validate incoming data


class UserInput(BaseModel):

    age: Annotated[
        int,
        Field(..., ge=29, le=77, description="Age of the User")
    ]

    sex: Annotated[
        int,
        Field(..., ge=0, le=1,
              description="Sex: 0 = Female, 1 = Male")
    ]

    cp: Annotated[
        int,
        Field(..., ge=0, le=3,
              description="Chest Pain Type: 0, 1, 2, 3")
    ]

    trestbps: Annotated[
        int,
        Field(..., gt=94, lt=200,
              description="Resting Blood Pressure")
    ]

    chol: Annotated[
        int,
        Field(..., ge=126, le=564,
              description="Serum Cholesterol")
    ]

    fbs: Annotated[
        int,
        Field(..., ge=0, le=1,
              description="Fasting Blood Sugar: 0 = No, 1 = Yes")
    ]

    restecg: Annotated[
        int,
        Field(..., ge=0, le=2,
              description="Resting ECG: 0, 1, 2")
    ]

    thalach: Annotated[
        int,
        Field(..., ge=71, le=202,
              description="Maximum Heart Rate Achieved")
    ]

    exang: Annotated[
        int,
        Field(..., ge=0, le=1,
              description="Exercise Induced Angina: 0 = No, 1 = Yes")
    ]

    oldpeak: Annotated[
        float,
        Field(..., ge=0.0, le=6.20,
              description="ST Depression induced by exercise")
    ]

    slope: Annotated[
        int,
        Field(..., ge=0, le=2,
              description="Slope of Peak Exercise ST Segment: 0, 1, 2")
    ]

    ca: Annotated[
        int,
        Field(..., ge=0, le=4,
              description="Number of Major Vessels: 0 to 4")
    ]

    thal: Annotated[
        int,
        Field(..., ge=0, le=3,
              description="Thalassemia: 0, 1, 2, 3")
    ]


# FASTAPI

#root

@app.get("/")

def welcome():
    return "Hello Welcome to Heart Disease API"


@app.post("/predict")

def predict_target(data:UserInput):


    input_df=pd.DataFrame([{
        'age':data.age,
        'sex':data.sex,
        'cp':data.cp,
        'trestbps':data.trestbps,
        'chol':data.chol,
        'fbs':data.fbs,
        'restecg':data.restecg, 
        'thalach':data.thalach,
        'exang':data.exang,
        'oldpeak':data.oldpeak,
        'slope':data.slope, 
        'ca':data.ca,
        'thal':data.thal
    }])

    pred = model.predict(input_df)[0]

    return {
        "Predicted_category": int(pred)
    }