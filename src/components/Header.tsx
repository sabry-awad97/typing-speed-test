export function Header() {
  return (
    <header className="text-center mb-10 animate-fade-in-down">
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="text-4xl animate-float">⌨️</span>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-light via-accent to-cyan-400 bg-clip-text text-transparent tracking-tight">
          TypeMaster
        </h1>
      </div>
      <p className="text-text-secondary text-lg">
        Test your typing speed and accuracy
      </p>
    </header>
  );
}
