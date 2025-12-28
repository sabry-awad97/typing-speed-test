import { useAppSelector } from "../store/hooks";

export function Content() {
  const { text, currentIndex, charStatuses } = useAppSelector(
    (state) => state.typing,
  );

  return (
    <div
      className="bg-black/40 border border-glass-border rounded-2xl p-8 mb-6 min-h-44 backdrop-blur-xl shadow-inner animate-fade-in-up"
      style={{ animationDelay: "0.3s", animationFillMode: "both" }}
    >
      <div className="font-mono text-2xl leading-loose tracking-wide break-words select-none">
        {text.split("").map((char, index) => {
          let className = "transition-colors duration-150 ";

          if (index < currentIndex) {
            className +=
              charStatuses[index] === "correct"
                ? "text-success"
                : "text-danger underline decoration-wavy underline-offset-4";
          } else if (index === currentIndex) {
            className += "text-text-primary animate-blink rounded-sm";
            // Add highlight background for current character
            return (
              <span
                key={index}
                className={className}
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, oklch(0.65 0.24 264 / 0.5) 60%)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          } else {
            className += "text-text-muted";
          }

          return (
            <span key={index} className={className}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
