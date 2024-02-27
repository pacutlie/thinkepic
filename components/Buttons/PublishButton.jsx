"use client";

export default function PublishButton({ props }) {
  const submit = props?.submit;
  const saveDraft = props?.saveDraft;
  const submitBtn = props?.update ? "Update" : "Submit";

  return (
    <div className="row g-2">
      <div className="col-md-6">
        <button type="button" className="btn btn-primary fw-bold px-md-3 w-100" onClick={(e) => saveDraft(e)}>
          <i className="ri-save-fill"></i>&nbsp;&nbsp;Simpan
        </button>
      </div>
      <div className="col-md-6">
        <button type="button" className="btn btn-success fw-bold px-md-3 w-100" onClick={(e) => submit(e)}>
          <i className="bi bi-send-fill"></i>&nbsp;&nbsp;{submitBtn}
        </button>
      </div>
    </div>
  );
}
