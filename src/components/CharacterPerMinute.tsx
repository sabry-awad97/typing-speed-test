export function CharacterPerMinute() {
  return (
    <div className="col-3 measurement">
      <div className="meas_container">
        <div className="typingIcon">
          <img src="images/cpm.png" width="30" />
        </div>
        <div className="value">0</div>
        <div className="title">
          <span>CPM</span>
        </div>
      </div>
      <div className="change">
        <span id="cpmChange"></span>
      </div>
    </div>
  );
}
