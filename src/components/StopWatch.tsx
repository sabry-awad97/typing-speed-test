export function StopWatch() {
  return (
    <div className="col-3 measurement">
      <div className="meas_container">
        <div className="typingIcon">
          <img src="images/stopwatch.png" width="45" />
        </div>
        <div className="value">60</div>
        <div className="title">
          <span>Time Left</span>
        </div>
      </div>
    </div>
  );
}
