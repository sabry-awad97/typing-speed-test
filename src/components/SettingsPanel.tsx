import { Difficulty } from "../utils/textGenerator";

interface SettingsPanelProps {
  duration: number;
  difficulty: Difficulty;
  onDurationChange: (duration: number) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const durations = [
  { value: 15, label: "15s" },
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 120, label: "2m" },
];

const difficulties: { value: Difficulty; label: string; emoji: string }[] = [
  { value: "easy", label: "Easy", emoji: "🌱" },
  { value: "medium", label: "Medium", emoji: "🌿" },
  { value: "hard", label: "Hard", emoji: "🌳" },
];

export function SettingsPanel({
  duration,
  difficulty,
  onDurationChange,
  onDifficultyChange,
  disabled,
}: SettingsPanelProps) {
  return (
    <div
      className={`flex justify-center gap-10 mb-8 p-5 bg-glass border border-glass-border rounded-2xl backdrop-blur-xl animate-fade-in-up ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
      style={{ animationDelay: "0.1s", animationFillMode: "both" }}
    >
      <div className="flex items-center gap-4">
        <span className="text-text-secondary text-sm font-medium">
          Duration:
        </span>
        <div className="flex gap-1 bg-black/30 p-1 rounded-xl">
          {durations.map((d) => (
            <button
              key={d.value}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                duration === d.value
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/10"
              }`}
              onClick={() => !disabled && onDurationChange(d.value)}
              disabled={disabled}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-text-secondary text-sm font-medium">
          Difficulty:
        </span>
        <div className="flex gap-1 bg-black/30 p-1 rounded-xl">
          {difficulties.map((d) => (
            <button
              key={d.value}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                difficulty === d.value
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/10"
              }`}
              onClick={() => !disabled && onDifficultyChange(d.value)}
              disabled={disabled}
            >
              <span>{d.emoji}</span> {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
