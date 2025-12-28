export interface HighScore {
  wpm: number;
  cpm: number;
  accuracy: number;
  duration: number;
  difficulty: string;
  date: string;
}

const STORAGE_KEY = "typing-test-high-scores";

export function getHighScores(): HighScore[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveHighScore(score: HighScore): void {
  const scores = getHighScores();
  scores.push(score);
  // Sort by WPM descending and keep top 10
  scores.sort((a, b) => b.wpm - a.wpm);
  const topScores = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
}

export function clearHighScores(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getPersonalBest(): HighScore | null {
  const scores = getHighScores();
  return scores.length > 0 ? scores[0] : null;
}
