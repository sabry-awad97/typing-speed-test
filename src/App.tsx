const App = () => {
  return (
    <div className="container-fluid">
      <div className="text-center">
        <header>
          <h1>Typing Test</h1>
        </header>
        <div className="row">
          <div className="col-3 measurement">
            <div className="meas_container">
              <div className="typingIcon">
                <img src="images/speed2.png" width="60" />
              </div>
              <div id="wpm" className="value">
                0
              </div>
              <div className="title">
                <span>WPM</span>
              </div>
            </div>
            <div className="change">
              <span id="wpmChange"></span>
            </div>
          </div>
          <div className="col-3 measurement">
            <div className="meas_container">
              <div className="typingIcon">
                <img src="images/cpm.png" width="30" />
              </div>
              <div id="cpm" className="value">
                0
              </div>
              <div className="title">
                <span>CPM</span>
              </div>
            </div>
            <div className="change">
              <span id="cpmChange"></span>
            </div>
          </div>
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
          <div className="col-3 measurement">
            <div className="meas_container">
              <div className="typingIcon">
                <img src="images/stopwatch.png" width="45" />
              </div>
              <div id="timeLeft" className="value">
                60
              </div>
              <div className="title">
                <span>Time Left</span>
              </div>
            </div>
          </div>
        </div>

        <div id="content" className="text-center"></div>

        <div>
          <input
            type="text"
            placeholder="type here"
            className="text-center"
            id="input"
          />
        </div>

        <div className="keyboard"></div>

        <div className="restart">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => location.reload()}
          >
            Restart
          </button>
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">You finished your test!</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name" className="sr-only">
                    Enter your name:{' '}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-info" id="download">
                  Download your certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
