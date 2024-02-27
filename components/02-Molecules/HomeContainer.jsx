export default function HomeContainer({ children }) {
  return (
    <div className="container-fluid col-md-9 my-md-5 py-5 px-md-4 rounded-3" style={{ backgroundColor: "#F5F6F8" }}>
      {children}
    </div>
  );
}
