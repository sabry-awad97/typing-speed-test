import { useCallback, useEffect, useRef } from "react";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { ResultsModal } from "./components/ResultsModal";
import { SettingsPanel } from "./components/SettingsPanel";
import { StatsPanel } from "./components/StatsPanel";
import { TextInput } from "./components/TextInput";
import { useActions, useAppSelector } from "./store/hooks";

const App = () => {
  const actions = useActions();
  const { isActive, isComplete, settings } = useAppSelector(
    (state) => state.typing,
  );
  const timerRef = useRef<number | null>(null);

  // Handle timer
  useEffect(() => {
    if (isActive && !isComplete) {
      timerRef.current = window.setInterval(() => {
        actions.tick();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isComplete, actions]);

  // Stop timer when complete
  useEffect(() => {
    if (isComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isComplete]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isComplete) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        actions.deleteCharacter();
        return;
      }

      if (e.key.length !== 1) return;

      if (!isActive) {
        actions.startTest();
      }

      actions.typeCharacter(e.key);
    },
    [actions, isActive, isComplete],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleRestart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    actions.resetTest();
  }, [actions]);

  const handleDurationChange = useCallback(
    (duration: number) => {
      actions.setDuration(duration);
      actions.resetTest();
    },
    [actions],
  );

  const handleDifficultyChange = useCallback(
    (difficulty: "easy" | "medium" | "hard") => {
      actions.setDifficulty(difficulty);
      actions.resetTest();
    },
    [actions],
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Keyboard background decoration */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 opacity-10 pointer-events-none z-0 bg-[url('/images/keyboard.jpeg')] bg-no-repeat bg-bottom bg-contain"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 py-8 flex-1 relative z-10 w-full">
        <Header />

        <SettingsPanel
          duration={settings.duration}
          difficulty={settings.difficulty}
          onDurationChange={handleDurationChange}
          onDifficultyChange={handleDifficultyChange}
          disabled={isActive}
        />

        <StatsPanel />

        <Content />

        <TextInput onRestart={handleRestart} isActive={isActive} />

        {isComplete && <ResultsModal onRestart={handleRestart} />}
      </div>

      <footer className="text-center py-6 text-text-muted text-sm relative z-10">
        <p>
          Start typing to begin • Press{" "}
          <kbd className="bg-white/10 border border-white/20 rounded px-2 py-0.5 font-mono text-xs shadow-sm">
            Tab
          </kbd>{" "}
          +{" "}
          <kbd className="bg-white/10 border border-white/20 rounded px-2 py-0.5 font-mono text-xs shadow-sm">
            Enter
          </kbd>{" "}
          to restart
        </p>
      </footer>
    </div>
  );
};

export default App;
