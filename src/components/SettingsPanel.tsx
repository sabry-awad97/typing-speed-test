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
    <div className={`settings-panel ${disabled ? "disabled" : ""}`}>
      <div className="settings-group">
        <span className="settings-label">Duration:</span>
        <div className="button-group">
          {durations.map((d) => (
            <button
              key={d.value}
              className={`setting-button ${
                duration === d.value ? "active" : ""
              }`}
              onClick={() => !disabled && onDurationChange(d.value)}
              disabled={disabled}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-label">Difficulty:</span>
        <div className="button-group">
          {difficulties.map((d) => (
            <button
              key={d.value}
              className={`setting-button ${
                difficulty === d.value ? "active" : ""
              }`}
              onClick={() => !disabled && onDifficultyChange(d.value)}
              disabled={disabled}
            >
              <span className="emoji">{d.emoji}</span> {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
