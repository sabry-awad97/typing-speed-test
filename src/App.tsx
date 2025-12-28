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
      // Ignore if modal is open or modifier keys
      if (isComplete) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Handle backspace
      if (e.key === "Backspace") {
        e.preventDefault();
        actions.deleteCharacter();
        return;
      }

      // Ignore special keys
      if (e.key.length !== 1) return;

      // Start test on first character
      if (!isActive) {
        actions.startTest();
      }

      actions.typeCharacter(e.key);
    },
    [actions, isActive, isComplete],
  );

  // Global keyboard listener
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
    <div className="app">
      <div className="container">
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

      <footer className="footer">
        <p>
          Start typing to begin • Press <kbd>Tab</kbd> + <kbd>Enter</kbd> to
          restart
        </p>
      </footer>
    </div>
  );
};

export default App;
