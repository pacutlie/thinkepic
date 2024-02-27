export default function InputText({ props, onChange }) {
  const title = props?.title ?? null;
  const value = props?.value ?? null;
  const labelCol = props?.labelCol ?? "col-sm-2";
  const inputCol = props?.inputCol ?? "col-sm-10";
  const mb = props?.mb ?? "mb-3";
  const htmlFor = props?.htmlFor ?? null;
  const name = props?.name ?? null;
  const error = props?.error ?? null;
  const placeholder = props?.placeholder ?? null;
  const autoComplete = props?.autoComplete ?? "on";

  return (
    <div className={`row ${mb}`}>
      <label htmlFor={htmlFor} className={`${labelCol} col-form-label`}>
        {title}
      </label>
      <div className={`${inputCol}`}>
        <input type="text" name={name} placeholder={placeholder} autoComplete={autoComplete} value={value} onChange={onChange} className="form-control" id={htmlFor} />
        {error?.error && <span className="text-danger fs-sm">{error?.message}</span>}
      </div>
    </div>
  );
}
