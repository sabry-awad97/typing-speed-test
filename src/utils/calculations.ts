/**
 * Calculate Words Per Minute
 * Standard: 5 characters = 1 word
 */
export function calculateWPM(
  correctCharacters: number,
  timeElapsedSeconds: number,
): number {
  if (timeElapsedSeconds === 0) return 0;
  const minutes = timeElapsedSeconds / 60;
  const words = correctCharacters / 5;
  return Math.round(words / minutes);
}

/**
 * Calculate Characters Per Minute
 */
export function calculateCPM(
  totalCharacters: number,
  timeElapsedSeconds: number,
): number {
  if (timeElapsedSeconds === 0) return 0;
  const minutes = timeElapsedSeconds / 60;
  return Math.round(totalCharacters / minutes);
}

/**
 * Calculate Accuracy Percentage
 */
export function calculateAccuracy(
  correctCharacters: number,
  totalCharacters: number,
): number {
  if (totalCharacters === 0) return 100;
  return Math.round((correctCharacters / totalCharacters) * 100);
}

/**
 * Get performance rating based on WPM
 */
export function getPerformanceRating(wpm: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (wpm >= 80) {
    return { label: "Expert", color: "var(--success)", emoji: "🏆" };
  } else if (wpm >= 60) {
    return { label: "Advanced", color: "var(--primary)", emoji: "⚡" };
  } else if (wpm >= 40) {
    return { label: "Intermediate", color: "var(--warning)", emoji: "👍" };
  } else if (wpm >= 25) {
    return { label: "Beginner", color: "var(--text-secondary)", emoji: "📝" };
  } else {
    return { label: "Keep Practicing", color: "var(--danger)", emoji: "💪" };
  }
}
