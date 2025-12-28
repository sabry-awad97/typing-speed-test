import { useAppSelector } from "../store/hooks";

export function Content() {
  const { text, currentIndex, charStatuses } = useAppSelector(
    (state) => state.typing,
  );

  return (
    <div
      className="
        relative bg-bg-card/80 backdrop-blur-xl 
        border border-glass-border rounded-2xl 
        p-8 mb-8 min-h-48
        shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)]
        animate-fade-in-up
      "
      style={{ animationDelay: "0.3s", animationFillMode: "both" }}
    >
      <div className="font-mono text-xl sm:text-2xl leading-[2.5] tracking-wide break-words select-none">
        {text.split("").map((char, index) => {
          const isCorrect = charStatuses[index] === "correct";
          const isIncorrect = charStatuses[index] === "incorrect";
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          if (isCurrent) {
            return (
              <span key={index} className="relative text-text-primary">
                <span className="animate-blink absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                {char === " " ? "\u00A0" : char}
              </span>
            );
          }

          if (isCorrect) {
            return (
              <span key={index} className="text-success glow-success">
                {char === " " ? "\u00A0" : char}
              </span>
            );
          }

          if (isIncorrect) {
            return (
              <span
                key={index}
                className="text-danger underline decoration-wavy underline-offset-4 glow-danger"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          }

          return (
            <span key={index} className="text-text-muted">
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
