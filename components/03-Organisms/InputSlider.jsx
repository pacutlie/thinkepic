import Image from "next/image";

export default function InputSlider({ props }) {
  const index = props?.index;
  const slider = props?.slider[index];
  const handleSlideFile = props?.handleSlideFile;
  const handleDelete = props?.handleDelete;
  const handleSave = props?.handleSave;
  const handleUpdate = props?.handleUpdate;
  const setSliderTitle = props?.setSliderTitle;
  const setSliderCaption = props?.setSliderCaption;
  const titleError = props?.titleError[index] || "";
  const captionError = props?.captionError[index] || "";
  const imgSrc = slider.imageUrl || slider.media?.path;

  return (
    <div className="row mb-4">
      <div className="col-sm-7">
        <div className="mb-3">
          <label className="mb-2" htmlFor={`title`}>
            Titel
          </label>
          <input className={`form-control ${titleError?.status ? "is-invalid" : ""}`} placeholder="Titel slide" value={slider?.title} onChange={(e) => setSliderTitle(e.target.value, index)} />
          {titleError?.status && <span className="text-danger fs-sm">{titleError?.message}</span>}
        </div>
        <div>
          <label className="mb-2" htmlFor={`caption`}>
            Caption
          </label>
          <textarea
            className={`form-control ${captionError?.status ? "is-invalid" : ""}`}
            placeholder="Caption slide"
            value={slider?.caption}
            id={`caption`}
            cols="30"
            // rows="4"
            onChange={(e) => setSliderCaption(e.target.value, index)}
          ></textarea>
          {captionError?.status && <span className="text-danger fs-sm">{captionError?.message}</span>}
        </div>
      </div>
      <div className="col-sm-5">
        <div className="mb-3">
          <div className="mb-2">Slide {index + 1}</div>
          <label htmlFor={`banner-menu-${index}`} className={`border ${imgSrc ? "" : "bg-secondary-light"} thumbnail-uploader rounded d-flex justify-content-center align-items-center overflow-hidden`} style={{ minHeight: 145 }}>
            {imgSrc ? (
              <div className="w-100">
                <Image priority src={imgSrc} width={0} height={0} sizes="100vw" style={{ objectFit: "cover", width: "auto", height: "auto", minWidth: "100%", maxHeight: 145 }} alt="preview" />
              </div>
            ) : (
              <div className="text-secondary fs-4">Browse</div>
            )}
            <input type="file" accept="image/png, image/gif, image/jpeg" id={`banner-menu-${index}`} onChange={(event) => handleSlideFile(event, index)} hidden />
          </label>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-sm btn-danger d-flex gap-1 align-items-center justify-content-center" onClick={() => handleDelete(index, slider?.id)}>
            <i className="bi bi-trash"></i>Hapus
          </button>

          {slider?.id ? (
            <button type="button" className="btn btn-sm btn-success d-flex gap-1 align-items-center justify-content-center" onClick={() => handleUpdate(index, slider?.id)}>
              <i className="bx bxs-save"></i>Update
            </button>
          ) : (
            <button type="button" className="btn btn-sm btn-primary d-flex gap-1 align-items-center justify-content-center" onClick={() => handleSave(index)}>
              <i className="bx bxs-save"></i>Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
