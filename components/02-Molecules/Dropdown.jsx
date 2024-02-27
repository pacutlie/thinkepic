export default function Dropdown({ children, props }) {
  const title = props?.title;
  const btnType = props?.btnType;
  const addClass = props?.addClass;

  return (
    <div className={`btn-group ${addClass}`}>
      <button type="button" className={`btn ${btnType} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
        {title}
      </button>
      <ul className="dropdown-menu">{children}</ul>
    </div>
  );
}
