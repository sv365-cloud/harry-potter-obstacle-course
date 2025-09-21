import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

/**
 * Help Modal Component
 * 
 * Displays game instructions and controls in an overlay modal:
 * - Keyboard controls (flap, shoot, pause)
 * - Mouse/touch controls
 * - Game objective and scoring
 */
export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div style={{
      position: "fixed", 
      left: 0, 
      top: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: 100,
      background: "rgba(0,0,0,0.79)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center"
    }}>
      <div style={{
        minWidth: "400px", 
        maxWidth: "90vw", 
        background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,40,0.9))", 
        padding: "30px", 
        borderRadius: "20px", 
        border: "2px solid #f3ce13",
        boxShadow: "0 8px 25px rgba(0,0,0,0.4)", 
        backdropFilter: "blur(10px)",
        color: "#fff", 
        lineHeight: 1.6, 
        fontSize: 16
      }}>
        <div style={{ 
          fontSize: "24px", 
          color: "#f3ce13", 
          marginBottom: "20px", 
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)", 
          fontWeight: "bold"
        }}>
          📖 How to Play
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ 
            marginBottom: "12px", 
            fontSize: "18px", 
            color: "#f3ce13", 
            fontWeight: "bold" 
          }}>
            Controls:
          </div>
          <ul style={{ margin: "0 0 20px 0", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>
              <b style={{ color: "#ffd700" }}>Click / Tap / Up Arrow</b> - Flap Harry upward
            </li>
            <li style={{ marginBottom: "8px" }}>
              <b style={{ color: "#ffd700" }}>Space Bar</b> - Shoot a spell from your magic wand!
            </li>
            <li style={{ marginBottom: "8px" }}>
              <b style={{ color: "#ffd700" }}>P Key</b> - Pause/Resume game
            </li>
          </ul>
          <div style={{ 
            marginBottom: "12px", 
            fontSize: "18px", 
            color: "#f3ce13", 
            fontWeight: "bold" 
          }}>
            Goal:
          </div>
          <p style={{ margin: "0 0 20px 0", color: "#ccc" }}>
            Fly as far as you can! Avoid obstacles and defeat witches using your magic wand.<br />
            Score points by surviving longer and eliminating more witches!
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%", 
            padding: "12px 24px", 
            background: "linear-gradient(45deg, #f3ce13, #ffd700)",
            color: "#000", 
            border: "none", 
            borderRadius: "8px", 
            fontWeight: "bold", 
            cursor: "pointer", 
            fontSize: "16px", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", 
            textTransform: "uppercase", 
            letterSpacing: "1px"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
