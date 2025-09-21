# Harry Potter: Hogwarts Obstacle Course 🧙‍♂️

A magical game where you play as Harry Potter flying through obstacles and defeating Witches with magic spells.

## How to Run

### Prerequisites
- Node.js
- Python

### Setup

1. **Clone the Repository**
   - Clone this repository and open that directory folder

2. **Start the Backend**
   ```bash
   cd backend
   # Note: you might need to enable a virtual environment. Ex: source your_environment_name/bin/activate
   pip3 install fastapi uvicorn pydantic
   python3 app.py
   ```
   Api is now available at http://localhost:8000.

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Play the Game**
   - Open `http://localhost:3000` in your browser

## Controls
- **Click/Up Arrow**: Push Harry upward
- **Space Bar**: Shoot magic spell
- **P Key**: Pause/Resume

## Goal
Fly as far as you can, avoid obstacles, defeat Witches, and compete for the highest score!

## Project Structure

- `frontend/` – React app source code
- `backend/` – Python FastAPI server for the leaderboard/scores
- `README.md` – This file

## Testing / Reset

To reset scores, stop the backend server and delete/reset the backend's score storage file (if any).

