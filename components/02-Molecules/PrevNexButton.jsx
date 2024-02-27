
export default function PrevNexButton() {
  return (
    <div className="d-flex justify-content-center justify-content-md-end gap-2">
      <button type="button" className="btn btn-app-3">
        <i className="bi bi-chevron-left"></i> Prev
      </button>
      <button type="button" className="btn btn-app-3">
        Next <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}
