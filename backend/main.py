from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from google import genai
from google.genai import types
from supabase import create_client

from dotenv import load_dotenv
from datetime import datetime
import os

import base64

# =========================
# LOAD ENV
# =========================

load_dotenv()

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

SUPABASE_URL = os.getenv(
    "SUPABASE_URL"
)

SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY"
)

# =========================
# CLIENTS
# =========================

client = genai.Client(
    api_key=GEMINI_API_KEY
)

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

# =========================
# FASTAPI
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================
# MODELS
# =========================

class UserSignup(BaseModel):

    name: str

    email: str

    password: str


class UserLogin(BaseModel):

    email: str

    password: str


class ProfileRequest(BaseModel):

    email: str
    name: str
    age: int
    weight: float
    height: float
    gender: str
    goal: str
    profile_image: str = ""


class goalRe(BaseModel):
    goal:str

class FoodRequest(BaseModel):
    food: str =""
    email:str =""
    image: str =""



class MaintenanceRequest(BaseModel):

    age: str
    weight: str
    height: str
    gender: str
    goal: str


class WorkoutRequest(BaseModel):
    goal: str

# class ChatData(BaseModel):
#     message: str

class BodyData(BaseModel):
    name: str = ""
    weight: str
    height: str
    age: str
    goal: str

class ChatRequest(BaseModel):
    email:str
    message:str


# =========================
# SIGNUP
# =========================

@app.post("/signup")
def signup(user: UserSignup):

    try:

        # CHECK EXISTING USER

        existing_user = supabase.table(
            "users"
        ).select("*").eq(
            "email",
            user.email
        ).execute()

        if len(existing_user.data) > 0:

            return {
                "message":
                "Email already exists"
            }

        # PASSWORD VALIDATION

        if len(user.password) < 6:

            return {
                "message":"Password must be at least 6 characters"
            }

        # INSERT USER

        supabase.table(
            "users"
        ).insert({

            "name": user.name,
            "email": user.email,
            "password": user.password
        }).execute()

        return {
            "message":
            "Signup Successful"
        }

    except Exception as e:

        return {
            "message": str(e)
        }

# =========================
# LOGIN
# =========================

@app.post("/login")
def login(user: UserLogin):

    try:

        response = supabase.table("users").select("*").eq("email",user.email).execute()

        users = response.data

        # USER NOT FOUND

        if len(users) == 0:
            return {
                "message":
                "User Not Found"
            }

        db_user = users[0]

        # WRONG PASSWORD

        if db_user["password"] != user.password:

            return {
                "message":
                "Invalid Credentials"
            }
        #STREAK LOGIC
        today=datetime.now().strftime("%Y-%m-%d")
        last_login=db_user.get("last_login")
        streak=db_user.get("streak",1)
        diff=None
        #FIRST LOGIN
        if not last_login:
            streak=1
        else:
            last_date=datetime.strptime(last_login,"%Y-%m-%d")
            current_date=datetime.strptime(today,"%Y-%m-%d")
            diff=(current_date-last_date).days
        
        #NEXT DAY LOGIN
        if diff==1:
            streak+=1

        #SAME DAY LOGIN
        elif diff==0:
            streak=streak
        
        #streak broken
        else:
            streak=1
        
        #UPDATE DATABASE

        supabase.table("users").update({"streak":streak,"last_login":today}).eq("email",user.email).execute()


        return {
            "message":"Login Successful",
            "streak":streak
        }

    except Exception as e:
        
        return {
            "message": str(e)
        }

# =========================
# SAVE PROFILE
# =========================

@app.post("/save-profile")
def save_profile(profile: ProfileRequest):

    try:

        supabase.table(
            "users"
        ).update({
            "email": profile.email,

            "name": profile.name,

            "age": profile.age,

            "weight": profile.weight,

            "height": profile.height,

            "gender": profile.gender,

            "goal": profile.goal,

            "profile_image": profile.profile_image

        }).eq("email", profile.email).execute()

        return {
            "message":"Profile Saved"
        }

    except Exception as e:

        return {
            "message": str(e)
        }

# =========================
# GET PROFILE
# =========================

@app.get("/get-profile/{email}")
def get_profile(email: str):

    try:

        response = supabase.table(
            "users"
        ).select("*").eq(
            "email",
            email
        ).execute()

        return response.data[0]

    except Exception as e:

        return {
            "message": str(e)
        }

# =========================
# FOOD ANALYZER
# =========================

@app.post("/analyze-food")
def analyze_food(request: FoodRequest):

    try:

        prompt = """
        Analyze this food.

        Tell:
        1. Calories
        2. Protein
        3. Carbs
        4. Fats
        5. Whether it is healthy or not
        6. Is it suitable for the user's goal?
        Rules:
        1. If the food is not recognizable, say "Sorry, I can't analyze this food."
        2. Keep the answer short and to the point.
        3. If no data is available for the food, say "Sorry, I can't analyze this food."
        """

        # IMAGE ANALYSIS
        if request.image:

            image_bytes = base64.b64decode(request.image)

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    prompt,
                    types.Part.from_bytes(
                        data=image_bytes,
                        mime_type="image/jpeg"
                    )
                ]
            )

        # TEXT ANALYSIS
        else:

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=f"""
                Analyze this food:
                {request.food}

                Tell:
                - Calories
                - Protein
                - Carbs
                - Fats
                - Whether it is healthy
                - Whether it supports the user's goal
                Rules:
                1. If the food is not recognizable, say "Sorry, I can't analyze this food."
                2. Keep the answer short and to the point.
                3. if no data is available for the food, say "Sorry, I can't analyze this food."
                """
            )

        return {
            "result": response.text
        }

    except Exception as e:

        print("Food Analyzer Error:", str(e))

        return {
            "result": str(e)
        }

# =========================
# MAINTENANCE CALORIES
# =========================

@app.post("/maintenance-calories")
def maintenance_calories(data: BodyData):

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",

            contents=f"""
            User Details:

            Weight: {data.weight} kg
            Height: {data.height} cm
            Age: {data.age}
            Goal: {data.goal}

            Give:
            - maintenance calories
            - protein intake
            - workout suggestion
            Rule:-
            1. Keep answer short.
            2. if data is missing reply "Please insert data"
            """
        )

        # SIMPLE DYNAMIC VALUES

        weight = int(data.weight)

        calories = weight * 33

        protein = weight * 2

        if data.goal.lower() == "fat loss":

            calories -= 300

            workout = "Burpees 2x5\nRunning 15 min\nCycling 25min "

        elif data.goal.lower() == "muscle gain":

            calories += 300

            workout = "Bench Press 12x3\nDeadlift 6x3\nSquats 10x4"

        else:

            workout = "Pushups 10x3\nJogging 2.5K"

        
        return {

            "reply": response.text,

            "calories": str(calories),

            "protein": str(protein),

            "workout": workout

        }

    except Exception as e:

        return {
            "reply": str(e)
        }
# =========================
# WORKOUT PLAN
# =========================

@app.post("/workout-plan")
def workout_plan(request: WorkoutRequest):

    try:

        response = client.models.generate_content(

            model="gemini-2.5-flash",

            contents=f"""
            Create a workout plan for:

            {request.goal}

            Include:
            - exercises
            - sets
            - reps
            - tips
            - keep special symbols away(*,&,%,#,-,/)

            RULE:-
            - dont include * in response 
            - keep response short and on point
            """
        )

        return {
            "result":
            response.text
        }

    except Exception as e:

        return {
            "result": str(e)
        }
    

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",

            contents=f"""
            You are an AI Fitness Coach.

            User Question:
            {request.message}

            Give short professional fitness advice.
            """
        )
        ai_reply=response.text
        #Save user chat
        supabase.table(
            "chat_history"
        ).insert({
            "email":request.email,
            "user_message":request.message,
            "ai_response":ai_reply
        }).execute()

        return {
            "reply": ai_reply
        }

    except Exception as e:

        return {
            "reply": str(e)
        }
    
@app.get("/get-chat/{email}")
def getChat(email:str):
    try:
        response=supabase.table("chat_history").select("*").eq("email",email).order("created_at").execute()
        return response.data
    except Exception as e:
        return {
            "message":str(e)
        }

@app.delete("/clear-chat/{email}")
def clear_chat(email:str):
    try:
        supabase.table("chat_history").delete().eq("email",email).execute()
        return {
            "message":"Chat history cleared"
        }
    except Exception as e:
        return {
            "message":str(e)
        }