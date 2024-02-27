export default function Modal({ children, props }) {
  const title = props?.title;
  const target = props?.target;
  const closeText = props?.closeText;
  const submitText = props?.submitText;
  const classAdd = props?.classAdd;

  return (
    <div className="modal fade" id={target}>
      <div className={`modal-dialog ${classAdd}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0">{children}</div>
          <div className="modal-footer">
            {closeText && (
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {closeText}
              </button>
            )}

            {submitText && (
              <button type="button" className="btn btn-primary">
                {submitText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
