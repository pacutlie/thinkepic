import SuperAdminSide from "../04-Templates/SideBar/SuperAdminSide";
import AdminSide from "../04-Templates/SideBar/AdminSide";
import AuthorSide from "../04-Templates/SideBar/AuthorSide";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/Auth";

export default async function SideBar({ children }) {
  const session = await getServerSession(authOptions);

  let navItems;
  switch (session?.user?.role) {
    case "SUPERADMIN":
      navItems = <SuperAdminSide />;
      break;
    case "ADMIN":
      navItems = <AdminSide />;
      break;
    default:
      navItems = <AuthorSide />;
      break;
  }

  return (
    <aside id="sidebar" className="sidebar" style={{ zIndex: "999" }}>
      <ul className="sidebar-nav" id="sidebar-nav">
        {session?.user && navItems}
      </ul>
    </aside>
  );
}
