import React, { useRef, useEffect, useState } from "react";
import { renderHarry, renderObstacle, renderEnemy, renderBeams } from "./GameEntities";
import IntroScreen from "./IntroScreen";
import HelpModal from "./HelpModal";
import GameOverScreen from "./GameOverScreen";
import PauseOverlay from "./PauseOverlay";
import Leaderboard from "./Leaderboard";

/**
 * Main Harry Potter Obstacle Course Game Component
 * 
 * Features:
 * - Endless runner gameplay 
 * - Magic wand shoots spells
 * - Real-time leaderboard integration
 * - Pause/resume functionality
 * - Multiple game states (intro, playing, game over)
 */

// ----- GAME CONFIGURATION AND CONSTANTS -----
const CONFIG = {
  GAME_WIDTH: 800,
  GAME_HEIGHT: 600,
  PLAYER_W: 48,
  PLAYER_H: 48,
  GRAVITY: 0.6,
  FLAP_VEL: -8,
  OBSTACLE_W: 60,
  OBSTACLE_GAP: 220,
  ENEMY_W: 40,
  ENEMY_H: 40,
  BEAM_W: 10,
  API: "http://localhost:8000",
};

// ----- TYPE DEFINITIONS -----
type Obstacle = { x: number; height: number; id: number };
type Enemy = { x: number; y: number; color: string; type: string; id: number };
type Beam = { x: number; y: number; active: boolean };
type ScoreEntry = { name: string; score: number };

// ----- UTILITY FUNCTIONS -----
function getRandomObstacle(id: number): Obstacle {
  const min = 10;
  const max = CONFIG.GAME_HEIGHT - CONFIG.OBSTACLE_GAP - 10;
  const height = Math.floor(Math.random() * (max - min) + min);
  return { x: CONFIG.GAME_WIDTH, height, id };
}

function getRandomEnemy(id: number): Enemy {
  const y = Math.floor(Math.random() * (CONFIG.GAME_HEIGHT - CONFIG.ENEMY_H - 20)) + 10;
  return { x: CONFIG.GAME_WIDTH, y, color: "#1a1a1a", type: "Witch", id };
}

// ----- MAIN GAME COMPONENT -----
export default function App() {
  // --- Game State ---
  const [playerY, setPlayerY] = useState(CONFIG.GAME_HEIGHT / 2);
  const [vel, setVel] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([getRandomObstacle(0)]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);
  const [score, setScore] = useState(0);

  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // For unique IDs (refs, so do not cause rerenders)
  const obstacleId = useRef(1);
  const enemyId = useRef(1);

  // ----- MAIN GAME LOOP  -----
  useEffect(() => {
    if (!running || isPaused) return;
    const interval = setInterval(() => {
      // Apply gravity to Harry's vertical velocity
      setVel(v => Math.min(v + CONFIG.GRAVITY, 10));
      // Move Harry vertically, keeping within vertical bounds
      setPlayerY(y => Math.max(0, Math.min(CONFIG.GAME_HEIGHT - CONFIG.PLAYER_H, y + vel)));
      setScore(s => s + 1);

      // Move pillars leftward, spawn new pillars when necessary
      setObstacles(obs => {
        let nobs = obs.map(o => ({ ...o, x: o.x - 3 }));
        if (!gameOver && (nobs.length === 0 || nobs[nobs.length - 1].x < CONFIG.GAME_WIDTH - 200)) {
          nobs.push(getRandomObstacle(obstacleId.current++));
        }
        return nobs.filter(o => o.x + CONFIG.OBSTACLE_W > 0);
      });

      // Move enemies leftward, rarely spawn new ones, trim offscreen
      setEnemies(enms => {
        let nenms = enms.map(e => ({ ...e, x: e.x - 5 }));
        if (Math.random() > 0.985) {
          nenms.push(getRandomEnemy(enemyId.current++));
        }
        return nenms.filter(e => e.x + CONFIG.ENEMY_W > 0);
      });

      // Move beams to the right, remove offscreen or inactive
      setBeams(bs =>
        bs.filter(b => b.active && b.x < CONFIG.GAME_WIDTH).map(b => ({ ...b, x: b.x + 16 }))
      );
    }, 24);
    return () => clearInterval(interval);
  }, [vel, running, gameOver, isPaused]);

  // ----- INPUT HANDLING -----
  useEffect(() => {
    if (!running) return;

    // Make Harry move upwards
    const flap = () => setVel(CONFIG.FLAP_VEL);
    // Cast a magic beam
    const cast = () => setBeams(bs => [...bs, { x: 30 + CONFIG.PLAYER_W, y: playerY + CONFIG.PLAYER_H / 2 - 4, active: true }]);

    // Keyboard handler
    const onKey = (e: KeyboardEvent) => {
      // Prevent scrolling on arrows during game
      if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
      // P key: pause/unpause game
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setIsPaused(prev => !prev);
        return;
      }
      // Space bar: cast magic beam
      if (e.code === "Space") { e.preventDefault(); cast(); }
      // Up arrow: flap upwards
      if (e.key === "ArrowUp") flap();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", flap); // For mouse click flap
    window.addEventListener("touchstart", flap); // For tap flap

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", flap);
      window.removeEventListener("touchstart", flap);
    };
  }, [playerY, running]);

  // ----- COLLISION DETECTION -----
  useEffect(() => {
    if (!running) return;
    // Harry's bounding box
    const harryTop = playerY, harryBot = playerY + CONFIG.PLAYER_H, harryLeft = 30, harryRight = 30 + CONFIG.PLAYER_W;

    // Pillar collision
    for (const obs of obstacles) {
      if (
        obs.x < harryRight + 3 &&
        obs.x + CONFIG.OBSTACLE_W > harryLeft - 3 &&
        (harryTop < obs.height - 3 || harryBot > obs.height + CONFIG.OBSTACLE_GAP + 3)
      ) {
        setRunning(false); setGameOver(true);
      }
    }

    // Enemy collision
    for (const enemy of enemies) {
      if (
        enemy.x < harryRight + 2 &&
        enemy.x + CONFIG.ENEMY_W > harryLeft - 2 &&
        enemy.y < harryBot + 2 &&
        enemy.y + CONFIG.ENEMY_H > harryTop - 2
      ) {
        setRunning(false); setGameOver(true);
      }
    }

    // Beams collide with enemies -- both are removed
    setBeams(bs => {
      const newBeams = [...bs];
      setEnemies(enms => enms.filter(enemy => {
        let hit = false;
        for (let i = 0; i < newBeams.length; i++) {
          const beam = newBeams[i];
          if (beam.active && beam.y > enemy.y - 5 && beam.y < enemy.y + CONFIG.ENEMY_H + 5 && beam.x + CONFIG.BEAM_W > enemy.x - 5 && beam.x < enemy.x + CONFIG.ENEMY_W + 5) {
            hit = true; 
            newBeams[i] = { ...beam, active: false }; 
            setScore(s => s + 50); // Bonus points for eliminating witch
            break;
          }
        }
        return !hit;
      }));
      return newBeams;
    });

    // Game over if Harry hits top or bottom of screen
    if (playerY <= 0 || playerY + CONFIG.PLAYER_H >= CONFIG.GAME_HEIGHT) {
      setRunning(false); setGameOver(true);
    }
  }, [playerY, obstacles, enemies, beams, running]);

  // ----- LEADERBOARD -----
  useEffect(() => {
    fetch(`${CONFIG.API}/leaderboard`)
      .then(res => res.json())
      .then(setLeaderboard)
      .catch(() => setLeaderboard([]));
  }, [gameOver]);

  // ----- GAME FLOW HANDLERS -----
  function startGame() {
    setPlayerY(CONFIG.GAME_HEIGHT / 2);
    setVel(0);
    setObstacles([getRandomObstacle(0)]);
    setEnemies([]);
    setBeams([]);
    setScore(0);
    setGameOver(false);
    setRunning(true);
    setShowIntro(false);
    obstacleId.current = 1;
    enemyId.current = 1;
  }

  function submitScore() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Please enter a name before submitting your score!");
      return;
    }

    const capitalizedName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();

    fetch(`${CONFIG.API}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: capitalizedName, score }),
    })
      .then(() => fetch(`${CONFIG.API}/leaderboard`))
      .then(res => res.json())
      .then(setLeaderboard)
      .then(() => {
        setShowIntro(true);
        setGameOver(false);
        setName("");
      });
  }

  // ----- RENDER -----
  return (
    <div style={{ textAlign: "center", fontFamily: "serif", background: "#1c1746", minHeight: "100vh", color: "#fff" }}>
      {/* Game Title */}
      <h2 style={{ color: "#f3ce13", margin: 0, padding: "16px 0", fontFamily: "Harry Potter, serif" }}>Harry Potter: Hogwarts Obstacle Course</h2>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* Main Game and Leaderboard */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        {/* Game Area, Intro Screen, or Game Over Screen */}
        <div style={{ position: "relative" }}>
          {/* Pause Button - only show when game is running */}
          {running && !isPaused && (
            <button
              onClick={() => setIsPaused(true)}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 10,
                background: "rgba(0,0,0,0.7)",
                color: "#f3ce13",
                border: "2px solid #f3ce13",
                borderRadius: "5px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              ⏸️ Pause (P)
            </button>
          )}

          {showIntro ? (
            <IntroScreen 
              onStart={startGame} 
              onHelp={() => setShowHelp(true)} 
              gameWidth={CONFIG.GAME_WIDTH}
              gameHeight={CONFIG.GAME_HEIGHT}
            />
          ) : !running && gameOver ? (
            <GameOverScreen
              score={score}
              name={name}
              setName={setName}
              onSubmit={submitScore}
              onPlayAgain={startGame}
              onMainMenu={() => { setShowIntro(true); setGameOver(false); }}
              gameWidth={CONFIG.GAME_WIDTH}
              gameHeight={CONFIG.GAME_HEIGHT}
            />
          ) : (
            /* Normal Game Display */
            <>
              <svg width={CONFIG.GAME_WIDTH} height={CONFIG.GAME_HEIGHT} style={{ background: "#222d45", border: "4px solid #665f51", borderRadius: "8px" }}>
                {/* Stars */}
                {[...Array(24)].map((_, i) => (
                  <circle key={i} cx={Math.random()*CONFIG.GAME_WIDTH} cy={Math.random()*CONFIG.GAME_HEIGHT} r={1.2} fill="white" opacity="0.5"/>
                ))}
                {/* Obstacles, Enemies, Beams, Harry */}
                {obstacles.map(o => renderObstacle(o, CONFIG.OBSTACLE_W, CONFIG.OBSTACLE_GAP, CONFIG.GAME_HEIGHT))}
                {enemies.map(e => renderEnemy(e, CONFIG.ENEMY_W, CONFIG.ENEMY_H))}
                {renderBeams(beams)}
                {renderHarry(playerY, beams, CONFIG.PLAYER_W, CONFIG.PLAYER_H)}
              </svg>
              <div style={{ 
                fontSize: "24px", margin: "16px 0", color: "#f3ce13", 
                fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" 
              }}>
                Score: {score}
              </div>
            </>
          )}
          
          {/* Pause Overlay */}
          {isPaused && (
            <PauseOverlay
              onResume={() => setIsPaused(false)}
              onRestart={() => {
                setIsPaused(false);
                startGame();
              }}
              onHelp={() => setShowHelp(true)}
              gameWidth={CONFIG.GAME_WIDTH}
              gameHeight={CONFIG.GAME_HEIGHT}
            />
          )}
        </div>
        
        {/* Enhanced Leaderboard */}
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </div>
  );
}