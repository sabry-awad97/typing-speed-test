export function Restart() {
  return (
    <div className="restart">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => location.reload()}
      >
        Restart
      </button>
    </div>
  );
}
