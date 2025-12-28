import { useEffect, useRef } from "react";

interface TextInputProps {
  onRestart: () => void;
  isActive: boolean;
}

export function TextInput({ onRestart, isActive }: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const tabPressedRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      tabPressedRef.current = true;
      setTimeout(() => (tabPressedRef.current = false), 500);
    }

    if (e.key === "Enter" && tabPressedRef.current) {
      e.preventDefault();
      onRestart();
      tabPressedRef.current = false;
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up"
      style={{ animationDelay: "0.4s", animationFillMode: "both" }}
    >
      <input
        ref={inputRef}
        type="text"
        className="
          flex-1 
          bg-bg-card/60 backdrop-blur-xl
          border-2 border-glass-border 
          rounded-xl px-6 py-4 
          font-mono text-lg text-text-primary 
          outline-none
          transition-all duration-300
          placeholder:text-text-muted
          focus:border-primary focus:shadow-[0_0_30px_-5px] focus:shadow-primary/40
        "
        placeholder={
          isActive ? "Keep typing..." : "Click here and start typing..."
        }
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <button
        className="
          gradient-button
          flex items-center justify-center gap-2.5 
          px-8 py-4 
          rounded-xl 
          text-white text-base font-semibold 
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
          active:translate-y-0
          group
        "
        onClick={onRestart}
      >
        <span className="relative z-10 flex items-center gap-2">
          <span className="text-xl transition-transform duration-300 group-hover:rotate-180">
            ↻
          </span>
          Restart
        </span>
      </button>
    </div>
  );
}
