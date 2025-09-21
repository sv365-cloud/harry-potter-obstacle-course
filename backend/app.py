"""
Harry Potter Obstacle Course - Backend API Server

FastAPI backend service providing:
- Score submission endpoint
- Leaderboard retrieval endpoint
- SQLite database for persistent score storage
- CORS support for frontend integration
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

# Initialize FastAPI application
app = FastAPI()

# Configure CORS middleware to allow frontend requests during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite database file for storing player scores
DB = 'scores.db'

def setup_db():
    conn = sqlite3.connect(DB)
    conn.execute('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY, name TEXT, score INTEGER)')
    conn.commit()
    conn.close()
setup_db()

class Score(BaseModel):
    name: str
    score: int

@app.post("/submit")
def submit_score(score: Score):
    conn = sqlite3.connect(DB)
    conn.execute("INSERT INTO scores (name, score) VALUES (?, ?)", (score.name, score.score))
    conn.commit()
    conn.close()
    return {"status": "ok"}

@app.get("/leaderboard", response_model=List[Score])
def get_leaderboard():
    conn = sqlite3.connect(DB)
    cursor = conn.execute("SELECT name, score FROM scores ORDER BY score DESC LIMIT 10")
    results = [Score(name=row[0], score=row[1]) for row in cursor.fetchall()]
    conn.close()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
