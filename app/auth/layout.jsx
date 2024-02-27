import Toast from "@/components/02-Molecules/Toast";

export default function AuthLayout({ children }) {
  return (
    <body className="toggle-sidebar">
      <Toast />
      <main>
        <section>{children}</section>
      </main>
    </body>
  );
}
