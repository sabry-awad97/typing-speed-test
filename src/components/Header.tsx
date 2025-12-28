export function Header() {
  return (
    <header className="text-center mb-12 animate-fade-in-down">
      <div className="inline-flex items-center gap-4 mb-3">
        <span className="text-5xl animate-float drop-shadow-lg">⌨️</span>
        <h1 className="text-5xl font-bold tracking-tight gradient-text">
          TypeMaster
        </h1>
      </div>
      <p className="text-text-secondary text-lg font-medium">
        Test your typing speed and accuracy
      </p>
    </header>
  );
}
