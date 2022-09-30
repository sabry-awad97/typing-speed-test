export function Accuracy() {
  return (
    <div className="col-3 measurement">
      <div className="meas_container">
        <div className="typingIcon">
          <img src="images/accuracy.png" width="50" />
        </div>
        <div id="accuracy" className="value">
          0%
        </div>
        <div className="title">
          <span>Accuracy</span>
        </div>
      </div>
      <div className="change">
        <span id="accuracyChange"></span>
      </div>
    </div>
  );
}
