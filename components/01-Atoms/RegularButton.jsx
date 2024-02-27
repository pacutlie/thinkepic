"use client";

export default function RegularButton({ children, props, onClick }) {
  const addClass = props?.addClass ?? "";
  const title = props?.title;
  const icon = props?.icon;

  return (
    <button className={"btn " + addClass} onClick={onClick} title={title}>
      {icon && <i className={icon}></i>}
      {title}
    </button>
  );
}
