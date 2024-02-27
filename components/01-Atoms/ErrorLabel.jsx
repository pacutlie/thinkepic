
export default function ErrorLabel({ message }) {
  return (
    <div className="text-danger mt-1" style={{ fontSize: ".75rem" }}>
      {message}
    </div>
  );
}
