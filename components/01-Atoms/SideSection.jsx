export default function SideSection({ props }) {
  const icon = props?.icon;
  const title = props?.title;
  return (
    <li className="menu-section">
      <h4 className="menu-text">{title}</h4>
      <i className={`menu-icon ${icon} icon-md`}></i>
    </li>
  );
}
