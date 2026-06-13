from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

# --- Mock ML Orchestration setup (LangChain placeholder) ---
# In a real app, you would import LangChain LLMs and Prompts here.
# e.g., from langchain.llms import OpenAI
# from langchain.prompts import PromptTemplate

app = FastAPI(title="Nexus AI ML Backend")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProfileContext(BaseModel):
    interests: List[str]
    role: str

class RecommendationResponse(BaseModel):
    id: int
    title: str
    type: str
    time: str
    reason: str
    tags: List[str]
    match: int

@app.get("/")
def read_root():
    return {"status": "Nexus AI ML Backend is running"}

@app.post("/api/recommendations", response_model=List[RecommendationResponse])
def get_recommendations(profile: ProfileContext):
    """
    Mock endpoint simulating a LangChain RetrievalQA or Agent generating personalized recommendations.
    """
    # Simulate processing time for embeddings and LLM generation
    time.sleep(1.0)
    
    # In a real setup, we would embed the profile.interests and query a vector database,
    # then use an LLM to generate the 'reason' string.
    
    return [
        {
            "id": 1,
            "title": "Generative AI in Production",
            "type": "Workshop",
            "time": "10:00 AM - 12:00 PM",
            "reason": f"Matches your background as a {profile.role} interested in {', '.join(profile.interests)}.",
            "tags": ["AI", "Engineering"],
            "match": 98
        },
        {
            "id": 2,
            "title": "Future of Developer Tools",
            "type": "Keynote",
            "time": "1:00 PM - 2:00 PM",
            "reason": "Aligns with the tooling aspect of your profile.",
            "tags": ["DevTools", "Future"],
            "match": 92
        }
    ]

class ScheduleEvent(BaseModel):
    id: int
    title: str
    start: str
    end: str
    priority: str

class OptimizeRequest(BaseModel):
    current_schedule: List[ScheduleEvent]

@app.post("/api/optimize-schedule")
def optimize_schedule(request: OptimizeRequest):
    """
    Simulates a constrained optimization algorithm (e.g., OR-Tools or LLM Agent) resolving schedule conflicts.
    """
    time.sleep(1.5)
    
    return {
        "status": "success",
        "message": "Schedule optimized!",
        "added_events": [
            {
                "id": 999,
                "title": "Networking Power Hour (AI Recommended)",
                "start": "2026-06-13T15:00:00.000Z",
                "end": "2026-06-13T16:00:00.000Z",
                "isAllDay": False,
                "priority": "high"
            }
        ]
    }
