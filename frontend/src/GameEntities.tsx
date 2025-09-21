import React from "react";

/**
 * Game Entity Rendering
 * 
 * Contains all rendering functions for game objects:
 * - Harry Potter character
 * - Obstacle pillars 
 * - Enemy witches 
 * - Magic wand spells
 */
export const renderHarry = (playerY: number, beams: any[], PLAYER_W: number, PLAYER_H: number) => {
  const centerX = 30 + PLAYER_W/2, centerY = playerY + PLAYER_H/2;
  return (
    <g>
      <ellipse cx={centerX} cy={playerY + PLAYER_H - 8} rx={PLAYER_W/2 + 4} ry={3} fill="#8B4513" />
      <rect x={centerX - 2} y={playerY + PLAYER_H - 12} width={4} height={8} fill="#654321" />
      <rect x={centerX - 1} y={playerY + PLAYER_H - 16} width={2} height={6} fill="#8B4513" />
      <circle cx={centerX} cy={playerY + 18} r={18} fill="#F4C2A1" stroke="#D4A574" strokeWidth={2} />
      <ellipse cx={centerX - 6} cy={playerY + 18} rx={7} ry={7} stroke="#2C2C2C" strokeWidth={2.5} fill="none" />
      <ellipse cx={centerX + 6} cy={playerY + 18} rx={7} ry={7} stroke="#2C2C2C" strokeWidth={2.5} fill="none" />
      <line x1={centerX - 1} y1={playerY + 18} x2={centerX + 1} y2={playerY + 18} stroke="#2C2C2C" strokeWidth={2} />
      <circle cx={centerX - 6} cy={playerY + 18} r={2} fill="#2C2C2C" />
      <circle cx={centerX + 6} cy={playerY + 18} r={2} fill="#2C2C2C" />
      <circle cx={centerX - 5} cy={playerY + 17} r={0.8} fill="white" />
      <circle cx={centerX + 7} cy={playerY + 17} r={0.8} fill="white" />
      <ellipse cx={centerX} cy={playerY + 22} rx={1.5} ry={2} fill="#E6B89C" />
      <path d={`M ${centerX - 3} ${playerY + 26} Q ${centerX} ${playerY + 28} ${centerX + 3} ${playerY + 26}`} stroke="#2C2C2C" strokeWidth={1.5} fill="none" />
      <polyline points={`${centerX - 4},${playerY + 8} ${centerX - 1},${playerY + 12} ${centerX + 1},${playerY + 10} ${centerX + 4},${playerY + 14}`} stroke="#FFD700" strokeWidth={2.5} fill="none" />
      <rect x={30 + 8} y={playerY + 36} width={PLAYER_W - 16} height={12} fill="#7F0000" rx={6} />
      <rect x={30 + 10} y={playerY + 38} width={PLAYER_W - 20} height={8} fill="#FFD700" rx={4} />
      <rect x={30 + PLAYER_W - 2} y={playerY + PLAYER_H/2 - 1} width={20} height={2} fill="#8B4513" rx={1} />
      <circle cx={30 + PLAYER_W + 18} cy={playerY + PLAYER_H/2} r={1.5} fill="#FFD700" />
      {beams.some(b => b.active) && <circle cx={30 + PLAYER_W + 22} cy={playerY + PLAYER_H/2} r={1.2} fill="#FFD700" opacity={0.7} />}
    </g>
  );
};

/**
 * Renders obstacle pillar with gap
 */
export const renderObstacle = (o: any, OBSTACLE_W: number, OBSTACLE_GAP: number, GAME_HEIGHT: number) => (
  <g key={o.id}>
    <rect x={o.x} y={0} width={OBSTACLE_W} height={o.height} fill="#b8c2ff" />
    <rect x={o.x} y={o.height + OBSTACLE_GAP} width={OBSTACLE_W} height={GAME_HEIGHT - o.height - OBSTACLE_GAP} fill="#b8c2ff" />
  </g>
);

/**
 * Renders enemy witch character
 */
export const renderEnemy = (e: any, ENEMY_W: number, ENEMY_H: number) => {
  const centerX = e.x + ENEMY_W / 2, centerY = e.y + ENEMY_H / 2;

  return (
    <g key={e.id}>
      {/* Witch - Dark hooded figure */}
      <ellipse cx={centerX} cy={centerY + 6} rx={ENEMY_W/2 - 1} ry={ENEMY_H/2 - 1} fill="#1a1a1a" stroke="#000" strokeWidth={1} />
      <ellipse cx={centerX} cy={e.y + 8} rx={ENEMY_W/2 - 3} ry={ENEMY_H/3 - 2} fill="#2d2d2d" />
      <rect x={e.x + 2} y={e.y + 2} width={ENEMY_W - 4} height={8} fill="#000" rx={2} />
      <circle cx={centerX - 3} cy={e.y + 6} r={1.5} fill="#ff0000" />
      <circle cx={centerX + 3} cy={e.y + 6} r={1.5} fill="#ff0000" />
      <path d={`M ${e.x + 4} ${e.y + 12} Q ${centerX} ${e.y + 15} ${e.x + ENEMY_W - 4} ${e.y + 12}`} stroke="#000" strokeWidth={2} fill="none" />
      <ellipse cx={centerX} cy={e.y + 18} rx={ENEMY_W/2 - 2} ry={4} fill="#1a1a1a" />

      {/* Witch name label */}
      <text x={centerX} y={e.y - 6} fontSize="8" fill="#fff" textAnchor="middle" stroke="black" strokeWidth={0.5} fontWeight="bold">Witch</text>

      {/* Dark aura effect */}
      <ellipse cx={centerX} cy={centerY + 4} rx={ENEMY_W/2 + 3} ry={ENEMY_H/2 + 3} fill="#1a1a1a" opacity={0.2} />
    </g>
  );
};

/**
 * Renders magic beam projectiles
 */
export const renderBeams = (beams: any[]) =>
  beams.filter(b => b.active).map((b, i) =>
    <rect key={i} x={b.x} y={b.y} width={24} height={6} fill="#ffd700" rx={3} />
  );
