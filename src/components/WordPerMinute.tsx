export function WordPerMinute() {
  return (
    <div className="col-3 measurement">
      <div className="meas_container">
        <div className="typingIcon">
          <img src="images/speed2.png" width="60" />
        </div>
        <div className="value">0</div>
        <div className="title">
          <span>WPM</span>
        </div>
      </div>
      <div className="change">
        <span></span>
      </div>
    </div>
  );
}
