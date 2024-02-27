export default function SideHeading({ props }) {
  const title = props?.title;
  return <li className="nav-heading">{title}</li>;
}
