"use client";

export default function LinkButton({ props, onClick }) {
  const title = props.title;
  const className = props.className;
  const disabled = props.disabled;
  return (
    <button type="buttons" disabled={disabled} className={`${className} action-btn`} onClick={() => onClick()}>
      {title}
    </button>
  );
}
