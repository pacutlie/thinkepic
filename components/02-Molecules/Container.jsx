export default function Container({ children }) {
  return (
    <div className="d-flex flex-column-fluid">
      <div className="container">{children}</div>
    </div>
  );
}
