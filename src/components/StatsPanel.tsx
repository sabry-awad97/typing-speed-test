import { useAppSelector } from "../store/hooks";

export function StatsPanel() {
  const { stats, timeRemaining, isActive, settings } = useAppSelector(
    (state) => state.typing,
  );

  const getAccuracyStyle = () => {
    if (stats.accuracy >= 95)
      return { class: "text-success glow-success", color: "success" };
    if (stats.accuracy >= 85)
      return { class: "text-warning", color: "warning" };
    return { class: "text-danger glow-danger", color: "danger" };
  };

  const getTimeStyle = () => {
    if (timeRemaining <= 10) return "text-danger animate-pulse-glow";
    if (timeRemaining <= 20) return "text-warning";
    return "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, "0")}`
      : `${secs}s`;
  };

  const accuracyStyle = getAccuracyStyle();
  const progressPercent = (timeRemaining / settings.duration) * 100;

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 animate-fade-in-up"
      style={{ animationDelay: "0.2s", animationFillMode: "both" }}
    >
      <StatCard icon="/images/speed2.png" iconAlt="WPM" label="WPM">
        <span className="gradient-text">{stats.wpm}</span>
      </StatCard>

      <StatCard icon="/images/cpm.png" iconAlt="CPM" label="CPM">
        {stats.cpm}
      </StatCard>

      <StatCard icon="/images/accuracy.png" iconAlt="Accuracy" label="Accuracy">
        <span className={accuracyStyle.class}>{stats.accuracy}%</span>
      </StatCard>

      <div className="relative glass-card rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
          <img
            src="/images/stopwatch.png"
            alt="Time"
            className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div
          className={`text-3xl font-bold font-mono tracking-tight ${getTimeStyle()}`}
        >
          {formatTime(timeRemaining)}
        </div>
        <div className="text-xs text-text-secondary uppercase tracking-widest mt-1 font-medium">
          Time Left
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-cyan transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  iconAlt,
  label,
  children,
}: {
  icon: string;
  iconAlt: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
        <img
          src={icon}
          alt={iconAlt}
          className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight">
        {children}
      </div>
      <div className="text-xs text-text-secondary uppercase tracking-widest mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}
