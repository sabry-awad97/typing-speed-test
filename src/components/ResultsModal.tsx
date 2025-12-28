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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="relative bg-gradient-to-b from-bg-card to-bg-primary border border-glass-border rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center animate-scale-in shadow-2xl overflow-hidden">
        {/* Decorative gradient orb */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
          aria-hidden="true"
        />

        {/* Certificate decoration */}
        <div
          className="absolute -top-4 -right-4 w-20 h-20 opacity-10 rotate-12"
          aria-hidden="true"
        >
          <img
            src="/images/certificate.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative mb-8">
          <span className="text-6xl block mb-4 animate-bounce-subtle drop-shadow-lg">
            {rating.emoji}
          </span>
          <h2 className="text-3xl font-bold mb-2 gradient-text">
            Test Complete!
          </h2>
          <p className="text-xl font-semibold" style={{ color: rating.color }}>
            {rating.label}
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3 mb-8">
          {/* Main WPM Result */}
          <div className="col-span-3 glass-card rounded-xl p-6 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="text-5xl font-bold font-mono gradient-text">
              {stats.wpm}
            </div>
            <div className="text-sm text-text-secondary mt-1">
              Words per Minute
            </div>
          </div>

          <ResultItem value={stats.cpm} label="CPM" />
          <ResultItem value={`${stats.accuracy}%`} label="Accuracy" />
          <ResultItem value={stats.correctChars} label="Correct" />
          <ResultItem value={stats.incorrectChars} label="Errors" />
          <ResultItem value={`${timeElapsed}s`} label="Time" />
          <ResultItem value={settings.difficulty} label="Level" capitalize />
        </div>

        <div className="relative mb-4">
          <button
            className="gradient-button inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={onRestart}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="transition-transform duration-300 group-hover:rotate-180">
                ↻
              </span>
              Try Again
            </span>
          </button>
        </div>

        <p className="relative text-success text-sm font-medium">
          ✓ Score saved to history
        </p>
      </div>
    </div>
  );
}

function ResultItem({
  value,
  label,
  capitalize = false,
}: {
  value: string | number;
  label: string;
  capitalize?: boolean;
}) {
  return (
    <div className="glass-card rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5">
      <div
        className={`text-xl font-bold font-mono ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-text-secondary mt-0.5">{label}</div>
    </div>
  );
}
