import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
  onHelp: () => void;
  gameWidth: number;
  gameHeight: number;
}

/**
 * Introduction Screen Component
 * 
 * Welcome screen displayed at game start, featuring:
 * - Game title and description
 * - Start Game button to begin gameplay
 * - Instructions button to show help modal
 */
export default function IntroScreen({ onStart, onHelp, gameWidth, gameHeight }: IntroScreenProps) {
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
        color: "#f3ce13", 
        margin: "0 0 20px 0", 
        fontSize: "24px", 
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)" 
      }}>
        Welcome to Hogwarts!
      </h2>
      <p style={{ 
        color: "#fff", 
        margin: "0 0 30px 0", 
        fontSize: "16px", 
        lineHeight: "1.5" 
      }}>
        Fly through obstacles, defeat witches with magic wand spells, and achieve the highest score!
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
        <button onClick={onStart} style={{
          padding: "12px 24px", 
          background: "linear-gradient(45deg, #2d5016, #1a3009)",
          color: "#f3ce13", 
          border: "2px solid #f3ce13", 
          borderRadius: "8px", 
          fontWeight: "bold", 
          cursor: "pointer",
          fontSize: "16px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", 
          textTransform: "uppercase", 
          letterSpacing: "1px",
          transition: "all 0.3s ease"
        }}>
          Start Game
        </button>
        <button onClick={onHelp} style={{
          padding: "12px 24px", 
          background: "linear-gradient(45deg, #1a2a3a, #0f1419)",
          color: "#f3ce13", 
          border: "2px solid #f3ce13", 
          borderRadius: "8px", 
          fontWeight: "bold", 
          cursor: "pointer",
          fontSize: "16px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", 
          textTransform: "uppercase", 
          letterSpacing: "1px",
          transition: "all 0.3s ease"
        }}>
          Instructions
        </button>
      </div>
    </div>
  );
}
