import React from 'react';

interface ScoreEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  leaderboard: ScoreEntry[];
}

/**
 * Leaderboard Component
 * 
 * Displays top 10 player scores with:
 * - Ranked list with medal icons for top 3
 * - Player names and formatted scores
 * - Special styling for podium positions
 * - Scrollable list for better UX
 */
export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <div style={{
      minWidth: "280px", 
      background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,40,0.9))", 
      padding: "25px", 
      borderRadius: "20px", 
      border: "2px solid #f3ce13",
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)", 
      backdropFilter: "blur(10px)",
      marginLeft: "20px"
    }}>
      <div style={{ 
        fontSize: "24px", 
        color: "#f3ce13", 
        marginBottom: "20px", 
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)", 
        fontWeight: "bold"
      }}>
        🏆 Leaderboard
      </div>
      {leaderboard.length === 0 ? (
        <div style={{ 
          color: "#ccc", 
          textAlign: "center", 
          fontStyle: "italic", 
          padding: "30px 0", 
          fontSize: "16px"
        }}>
          No scores yet
        </div>
      ) : (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {leaderboard.slice(0, 10).map((entry, i) => (
            <div key={i} style={{
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "12px 16px", 
              margin: "8px 0", 
              borderRadius: "10px",
              background: i < 3 ? "rgba(243, 206, 19, 0.15)" : "rgba(255,255,255,0.05)",
              border: i < 3 ? "1px solid rgba(243, 206, 19, 0.4)" : "1px solid transparent",
              transition: "all 0.3s ease"
            }}>
              <div style={{
                display: "flex", 
                alignItems: "center", 
                gap: "8px"
              }}>
                <span style={{
                  fontSize: "18px", 
                  fontWeight: "bold",
                  color: i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#fff"
                }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                </span>
                <span style={{
                  color: i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#fff",
                  fontWeight: i < 3 ? "bold" : "normal", 
                  fontSize: i < 3 ? "16px" : "15px"
                }}>
                  {entry.name}
                </span>
              </div>
              <span style={{
                color: "#f3ce13", 
                fontWeight: "bold", 
                fontSize: i < 3 ? "16px" : "15px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
              }}>
                {entry.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
