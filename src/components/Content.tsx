import { useAppSelector } from "../store/hooks";

export function Content() {
  const { text, currentIndex, charStatuses } = useAppSelector(
    (state) => state.typing,
  );

  return (
    <div className="content-container">
      <div className="text-display">
        {text.split("").map((char, index) => {
          let className = "char";

          if (index < currentIndex) {
            className +=
              charStatuses[index] === "correct" ? " correct" : " incorrect";
          } else if (index === currentIndex) {
            className += " current";
          } else {
            className += " pending";
          }

          // Handle space characters
          const displayChar = char === " " ? "\u00A0" : char;

          return (
            <span key={index} className={className}>
              {displayChar}
            </span>
          );
        })}
      </div>
    </div>
  );
}
