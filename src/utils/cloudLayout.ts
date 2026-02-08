interface CloudPosition {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
}

// Hand-tuned positions for 1-8 clouds
const PRESET_POSITIONS: CloudPosition[][] = [
  // 1 cloud
  [{ x: 45, y: 40, scale: 1.1 }],
  // 2 clouds
  [
    { x: 25, y: 35, scale: 1.0 },
    { x: 65, y: 45, scale: 1.05 },
  ],
  // 3 clouds
  [
    { x: 20, y: 30, scale: 1.0 },
    { x: 55, y: 20, scale: 0.95 },
    { x: 40, y: 55, scale: 1.05 },
  ],
  // 4 clouds
  [
    { x: 15, y: 25, scale: 0.95 },
    { x: 55, y: 15, scale: 1.0 },
    { x: 25, y: 55, scale: 1.05 },
    { x: 65, y: 50, scale: 0.9 },
  ],
  // 5 clouds
  [
    { x: 10, y: 20, scale: 0.9 },
    { x: 50, y: 10, scale: 1.0 },
    { x: 75, y: 25, scale: 0.95 },
    { x: 20, y: 50, scale: 1.05 },
    { x: 60, y: 55, scale: 0.9 },
  ],
  // 6 clouds
  [
    { x: 10, y: 15, scale: 0.9 },
    { x: 40, y: 8, scale: 0.95 },
    { x: 70, y: 18, scale: 1.0 },
    { x: 15, y: 48, scale: 1.0 },
    { x: 50, y: 45, scale: 0.9 },
    { x: 72, y: 52, scale: 0.95 },
  ],
  // 7 clouds
  [
    { x: 8, y: 12, scale: 0.85 },
    { x: 35, y: 5, scale: 0.95 },
    { x: 65, y: 12, scale: 0.9 },
    { x: 10, y: 42, scale: 1.0 },
    { x: 45, y: 38, scale: 0.95 },
    { x: 72, y: 42, scale: 0.85 },
    { x: 38, y: 62, scale: 1.0 },
  ],
  // 8 clouds
  [
    { x: 5, y: 10, scale: 0.85 },
    { x: 30, y: 5, scale: 0.9 },
    { x: 60, y: 8, scale: 0.95 },
    { x: 80, y: 18, scale: 0.85 },
    { x: 8, y: 42, scale: 0.95 },
    { x: 38, y: 38, scale: 1.0 },
    { x: 65, y: 45, scale: 0.9 },
    { x: 35, y: 62, scale: 0.85 },
  ],
];

export function getCloudPositions(count: number): CloudPosition[] {
  if (count <= 0) return [];
  if (count <= 8) return PRESET_POSITIONS[count - 1];

  // Golden angle distribution for > 8 clouds
  const positions: CloudPosition[] = [];
  const goldenAngle = 137.508;
  for (let i = 0; i < count; i++) {
    const r = 30 * Math.sqrt(i / count);
    const theta = (i * goldenAngle * Math.PI) / 180;
    positions.push({
      x: 45 + r * Math.cos(theta),
      y: 35 + r * Math.sin(theta) * 0.8,
      scale: 0.8 + Math.random() * 0.3,
    });
  }
  return positions;
}
