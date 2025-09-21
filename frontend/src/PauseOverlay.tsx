import React from 'react';

interface PauseOverlayProps {
  onResume: () => void;
  onRestart: () => void;
  onHelp: () => void;
  gameWidth: number;
  gameHeight: number;
}

/**
 * Pause Overlay Component
 * 
 * Overlay displayed when game is paused, providing:
 * - Resume game option
 * - Restart game option
 * - Access to help instructions
 */
export default function PauseOverlay({ onResume, onRestart, onHelp, gameWidth, gameHeight }: PauseOverlayProps) {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: gameWidth,
      height: gameHeight,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      zIndex: 20
    }}>
      <h2 style={{ 
        color: "#f3ce13", 
        margin: "0 0 30px 0", 
        fontSize: "28px" 
      }}>
        Game Paused
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "200px" }}>
        <button
          onClick={onResume}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(45deg, #2d5016, #1a3009)",
            color: "#f3ce13",
            border: "2px solid #f3ce13",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease"
          }}
        >
          Resume Game
        </button>
        <button
          onClick={onRestart}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(45deg, #1a2a3a, #0f1419)",
            color: "#f3ce13",
            border: "2px solid #f3ce13",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease"
          }}
        >
          Restart Game
        </button>
        <button
          onClick={onHelp}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(45deg, #3d2a1a, #2d1f14)",
            color: "#f3ce13",
            border: "2px solid #f3ce13",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease"
          }}
        >
          Get Help
        </button>
      </div>
    </div>
  );
}
