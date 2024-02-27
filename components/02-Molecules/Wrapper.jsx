export default function Wrapper({ children, addClass }) {
  return (
    <main id="main" className={`main ${addClass}`}>
      <section className="section">{children}</section>
    </main>
  );
}
