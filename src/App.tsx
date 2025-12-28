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

  useEffect(() => {
    if (isActive && !isComplete) {
      timerRef.current = window.setInterval(() => {
        actions.tick();
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isComplete, actions]);

  useEffect(() => {
    if (isComplete && timerRef.current) clearInterval(timerRef.current);
  }, [isComplete]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isComplete || e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        actions.deleteCharacter();
        return;
      }
      if (e.key.length !== 1) return;
      if (!isActive) actions.startTest();
      actions.typeCharacter(e.key);
    },
    [actions, isActive, isComplete],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleRestart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
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
      {/* Decorative elements */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float"
          style={{ animationDelay: "-1s" }}
        />

        {/* Keyboard background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-52 opacity-[0.06] bg-[url('/images/keyboard.jpeg')] bg-no-repeat bg-bottom bg-contain" />
      </div>

      <main className="max-w-4xl w-full mx-auto px-6 py-10 flex-1 relative z-10">
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
      </main>

      <footer className="text-center py-6 text-text-muted text-sm relative z-10">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Start typing to begin</span>
          <span className="text-text-muted/50">•</span>
          <span className="flex items-center gap-1.5">
            Press
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-xs text-text-secondary shadow-sm">
              Tab
            </kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-xs text-text-secondary shadow-sm">
              Enter
            </kbd>
            to restart
          </span>
        </p>
      </footer>
    </div>
  );
};

export default App;
