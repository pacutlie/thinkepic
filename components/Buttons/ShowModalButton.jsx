"use client";

export default function ShowModalButton({ props, handleShow }) {
  const title = props?.title;
  const target = "#" + props?.target;
  const icon = props?.icon;
  const className = props?.className ? props?.className : "btn btn-primary";

  return (
    <button className={className} onClick={handleShow}>
      <i className={icon}></i>&nbsp;{title}
    </button>
  );
}
