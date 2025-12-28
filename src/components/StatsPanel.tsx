import { useAppSelector } from "../store/hooks";

export function StatsPanel() {
  const { stats, timeRemaining, isActive, settings } = useAppSelector(
    (state) => state.typing,
  );

  const getAccuracyClass = () => {
    if (stats.accuracy >= 95) return "text-success";
    if (stats.accuracy >= 85) return "text-warning";
    return "text-danger";
  };

  const getTimeClass = () => {
    if (timeRemaining <= 10) return "text-danger animate-pulse-glow";
    if (timeRemaining <= 20) return "text-warning animate-pulse-glow";
    return "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, "0")}`
      : `${secs}s`;
  };

  return (
    <div
      className="grid grid-cols-4 gap-4 mb-8 animate-fade-in-up"
      style={{ animationDelay: "0.2s", animationFillMode: "both" }}
    >
      <StatCard icon="/images/speed2.png" value={stats.wpm} label="WPM" />
      <StatCard icon="/images/cpm.png" value={stats.cpm} label="CPM" />
      <StatCard
        icon="/images/accuracy.png"
        value={`${stats.accuracy}%`}
        label="Accuracy"
        valueClass={getAccuracyClass()}
      />
      <div className="relative bg-glass border border-glass-border rounded-2xl p-5 text-center backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover hover:-translate-y-1 hover:shadow-xl overflow-hidden group">
        <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
          <img
            src="/images/stopwatch.png"
            alt="Time"
            className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className={`text-3xl font-bold font-mono ${getTimeClass()}`}>
          {formatTime(timeRemaining)}
        </div>
        <div className="text-xs text-text-secondary uppercase tracking-wider mt-1">
          Time Left
        </div>
        {isActive && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-cyan-400 shadow-lg shadow-primary/50 transition-all duration-1000"
            style={{ width: `${(timeRemaining / settings.duration) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  valueClass = "",
}: {
  icon: string;
  value: string | number;
  label: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-glass border border-glass-border rounded-2xl p-5 text-center backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover hover:-translate-y-1 hover:shadow-xl group">
      <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
        <img
          src={icon}
          alt={label}
          className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className={`text-3xl font-bold font-mono ${valueClass}`}>
        {value}
      </div>
      <div className="text-xs text-text-secondary uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}
