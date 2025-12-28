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
    <div className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in p-6">
      <div className="bg-gradient-to-b from-bg-card/95 to-bg-primary/98 border border-glass-border rounded-3xl p-10 max-w-lg w-full text-center animate-scale-in shadow-2xl relative overflow-hidden">
        {/* Certificate decoration */}
        <div className="absolute -top-6 -right-6 w-24 h-24 opacity-15 rotate-12 pointer-events-none">
          <img
            src="/images/certificate.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mb-8">
          <span className="text-6xl block mb-4 animate-bounce-subtle">
            {rating.emoji}
          </span>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-text-primary to-primary-light bg-clip-text text-transparent">
            Test Complete!
          </h2>
          <p className="text-xl font-semibold" style={{ color: rating.color }}>
            {rating.label}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {/* Main WPM result */}
          <div className="col-span-3 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary rounded-xl p-6 transition-all duration-300 hover:bg-primary/25 hover:-translate-y-0.5">
            <div className="text-5xl font-bold font-mono bg-gradient-to-r from-primary-light via-accent to-cyan-400 bg-clip-text text-transparent">
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

        <div className="mb-4">
          <button
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-primary to-accent border-none rounded-full text-white text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-primary/40 hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
            onClick={onRestart}
          >
            <span>↻</span> Try Again
          </button>
        </div>

        <p className="text-success text-sm flex items-center justify-center gap-1">
          ✓ Score saved to your history
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
    <div className="bg-glass border border-glass-border rounded-xl p-4 transition-all duration-300 hover:bg-glass-hover hover:-translate-y-0.5">
      <div
        className={`text-2xl font-bold font-mono ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-text-secondary mt-1">{label}</div>
    </div>
  );
}
