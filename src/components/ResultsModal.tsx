import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { getPerformanceRating } from "../utils/calculations";
import { saveHighScore } from "../utils/localStorage";

interface ResultsModalProps {
  onRestart: () => void;
}

export function ResultsModal({ onRestart }: ResultsModalProps) {
  const { stats, timeElapsed, settings } = useAppSelector(
    (state) => state.typing,
  );
  const rating = getPerformanceRating(stats.wpm);

  useEffect(() => {
    // Save score when modal opens
    saveHighScore({
      wpm: stats.wpm,
      cpm: stats.cpm,
      accuracy: stats.accuracy,
      duration: settings.duration,
      difficulty: settings.difficulty,
      date: new Date().toISOString(),
    });
  }, [stats, settings]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="rating-emoji">{rating.emoji}</span>
          <h2>Test Complete!</h2>
          <p className="rating-label" style={{ color: rating.color }}>
            {rating.label}
          </p>
        </div>

        <div className="results-grid">
          <div className="result-item main-result">
            <div className="result-value">{stats.wpm}</div>
            <div className="result-label">Words per Minute</div>
          </div>

          <div className="result-item">
            <div className="result-value">{stats.cpm}</div>
            <div className="result-label">Characters per Minute</div>
          </div>

          <div className="result-item">
            <div className="result-value">{stats.accuracy}%</div>
            <div className="result-label">Accuracy</div>
          </div>

          <div className="result-item">
            <div className="result-value">{stats.correctChars}</div>
            <div className="result-label">Correct Characters</div>
          </div>

          <div className="result-item">
            <div className="result-value">{stats.incorrectChars}</div>
            <div className="result-label">Errors</div>
          </div>

          <div className="result-item">
            <div className="result-value">{timeElapsed}s</div>
            <div className="result-label">Time Taken</div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="primary-button" onClick={onRestart}>
            <span>↻</span> Try Again
          </button>
        </div>

        <p className="score-saved">✓ Score saved to your history</p>
      </div>
    </div>
  );
}
