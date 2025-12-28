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
      className={`
        flex flex-wrap justify-center gap-8 mb-10 p-4 
        glass-card rounded-2xl
        animate-fade-in-up transition-opacity duration-300
        ${disabled ? "opacity-40 pointer-events-none" : ""}
      `}
      style={{ animationDelay: "0.1s", animationFillMode: "both" }}
    >
      <SettingGroup label="Duration">
        {durations.map((d) => (
          <ToggleButton
            key={d.value}
            active={duration === d.value}
            onClick={() => onDurationChange(d.value)}
            disabled={disabled}
          >
            {d.label}
          </ToggleButton>
        ))}
      </SettingGroup>

      <div className="w-px bg-glass-border hidden sm:block" />

      <SettingGroup label="Difficulty">
        {difficulties.map((d) => (
          <ToggleButton
            key={d.value}
            active={difficulty === d.value}
            onClick={() => onDifficultyChange(d.value)}
            disabled={disabled}
          >
            <span className="mr-1">{d.emoji}</span>
            {d.label}
          </ToggleButton>
        ))}
      </SettingGroup>
    </div>
  );
}

function SettingGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-text-secondary text-sm font-medium tracking-wide uppercase">
        {label}
      </span>
      <div className="flex gap-1 p-1 bg-black/20 rounded-xl">{children}</div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg text-sm font-semibold
        transition-all duration-200 ease-out
        ${
          active
            ? "gradient-button text-white glow-primary"
            : "text-text-secondary hover:text-text-primary hover:bg-white/5"
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  );
}
