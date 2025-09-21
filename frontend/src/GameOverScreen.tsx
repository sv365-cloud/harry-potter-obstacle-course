import React from 'react';

interface GameOverScreenProps {
  score: number;
  name: string;
  setName: (name: string) => void;
  onSubmit: () => void;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  gameWidth: number;
  gameHeight: number;
}

/**
 * Game Over Screen Component
 * 
 * Displays when the game ends, showing:
 * - Final score
 * - Name input for leaderboard submission
 * - Options to submit score, play again, or return to main menu
 */
export default function GameOverScreen({ 
  score, 
  name, 
  setName, 
  onSubmit, 
  onPlayAgain, 
  onMainMenu, 
  gameWidth, 
  gameHeight 
}: GameOverScreenProps) {
  return (
    <div style={{
      width: gameWidth, 
      height: gameHeight, 
      background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,40,0.9))", 
      border: "4px solid #f3ce13", 
      borderRadius: "8px",
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center", 
      padding: "20px", 
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
    }}>
      <h2 style={{ 
        color: "#ff6b6b", 
        margin: "0 0 20px 0", 
        fontSize: "28px", 
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)" 
      }}>
        Game Over!
      </h2>
      <div style={{ 
        fontSize: "20px", 
        color: "#f3ce13", 
        marginBottom: "25px", 
        fontWeight: "bold" 
      }}>
        Final Score: {score}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          style={{
            padding: "10px 14px", 
            borderRadius: "6px", 
            border: "2px solid #f3ce13",
            background: "#2d2d2d", 
            color: "#fff", 
            fontSize: "14px", 
            width: "200px", 
            textAlign: "center"
          }}
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <button onClick={onSubmit}
          style={{
            padding: "10px 20px", 
            background: "linear-gradient(45deg, #2d5016, #1a3009)",
            color: "#f3ce13", 
            border: "2px solid #f3ce13", 
            borderRadius: "6px", 
            fontWeight: "bold", 
            cursor: "pointer",
            fontSize: "14px", 
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)", 
            textTransform: "uppercase", 
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          }}
        >
          Submit Score
        </button>
        <button onClick={onPlayAgain}
          style={{
            padding: "10px 20px", 
            background: "linear-gradient(45deg, #1a2a3a, #0f1419)",
            color: "#f3ce13", 
            border: "2px solid #f3ce13", 
            borderRadius: "6px", 
            fontWeight: "bold", 
            cursor: "pointer",
            fontSize: "14px", 
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)", 
            textTransform: "uppercase", 
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          }}
        >
          Play Again
        </button>
        <button onClick={onMainMenu}
          style={{
            padding: "10px 20px", 
            background: "linear-gradient(45deg, #3d2a1a, #2d1f14)",
            color: "#f3ce13", 
            border: "2px solid #f3ce13", 
            borderRadius: "6px", 
            fontWeight: "bold", 
            cursor: "pointer",
            fontSize: "14px", 
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)", 
            textTransform: "uppercase", 
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          }}
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}
