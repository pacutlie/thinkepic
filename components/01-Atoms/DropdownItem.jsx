export default function DropdownItem({ props }) {
  const title = props?.title;

  return (
    <li>
      <button className="dropdown-item app" href="#">
        {title}
      </button>
    </li>
  );
}
