export default function Nav({ children, props }) {
  const addClass = props?.addClass;

  return <ul className={`sidebar-nav ${addClass}`}>{children}</ul>;
}
