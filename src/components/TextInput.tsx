import { useEffect, useRef } from "react";

interface TextInputProps {
  onRestart: () => void;
  isActive: boolean;
}

export function TextInput({ onRestart, isActive }: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const tabPressedRef = useRef(false);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      tabPressedRef.current = true;
      // Reset after a short delay
      setTimeout(() => {
        tabPressedRef.current = false;
      }, 500);
    }

    if (e.key === "Enter" && tabPressedRef.current) {
      e.preventDefault();
      onRestart();
      tabPressedRef.current = false;
    }
  };

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type="text"
        className="typing-input"
        placeholder={
          isActive ? "Keep typing..." : "Click here and start typing..."
        }
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <button className="restart-button" onClick={onRestart}>
        <span className="restart-icon">↻</span>
        Restart
      </button>
    </div>
  );
}
