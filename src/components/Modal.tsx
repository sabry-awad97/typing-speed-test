export function Modal() {
  return (
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
  );
}
