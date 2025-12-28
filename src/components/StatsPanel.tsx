import { useAppSelector } from "../store/hooks";

export function StatsPanel() {
  const { stats, timeRemaining, isActive, settings } = useAppSelector(
    (state) => state.typing,
  );

  const getAccuracyClass = () => {
    if (stats.accuracy >= 95) return "stat-value accuracy-high";
    if (stats.accuracy >= 85) return "stat-value accuracy-medium";
    return "stat-value accuracy-low";
  };

  const getTimeClass = () => {
    if (timeRemaining <= 10) return "stat-value time-critical";
    if (timeRemaining <= 20) return "stat-value time-warning";
    return "stat-value";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, "0")}`
      : `${secs}s`;
  };

  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-icon">
          <img src="/images/speed2.png" alt="WPM" />
        </div>
        <div className="stat-value">{stats.wpm}</div>
        <div className="stat-label">WPM</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <img src="/images/cpm.png" alt="CPM" />
        </div>
        <div className="stat-value">{stats.cpm}</div>
        <div className="stat-label">CPM</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <img src="/images/accuracy.png" alt="Accuracy" />
        </div>
        <div className={getAccuracyClass()}>{stats.accuracy}%</div>
        <div className="stat-label">Accuracy</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <img src="/images/stopwatch.png" alt="Time" />
        </div>
        <div className={getTimeClass()}>{formatTime(timeRemaining)}</div>
        <div className="stat-label">Time Left</div>
        {isActive && (
          <div
            className="time-progress"
            style={{
              width: `${(timeRemaining / settings.duration) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
