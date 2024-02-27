"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/images/logos/epic_logo.png";
import ProfileNav from "../02-Molecules/ProfileNav";
import NotificationItem from "../01-Atoms/NotificationItem";
import SelectLanguange from "../02-Molecules/SelectLanguange";
import { useEffect, useState } from "react";

export default function Header({ props }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const chekcUrl = pathname.includes("superadmin") || pathname.includes("admin") || pathname.includes("author");

  useEffect(() => {
    const body = document.body;

    if (window.innerWidth < 992) {
      if (sidebarOpen) {
        body.classList.remove("toggle-sidebar");
      } else {
        body.classList.add("toggle-sidebar");
      }
    } else {
      if (sidebarOpen) {
        body.classList.remove("toggle-sidebar");
      } else {
        body.classList.add("toggle-sidebar");
      }
    }

    const handleResize = () => {
      if (window.innerWidth < 992) {
        if (sidebarOpen) {
          document.body.classList.remove("toggle-sidebar");
        } else {
          document.body.classList.add("toggle-sidebar");
        }
      } else {
        document.body.classList.add("toggle-sidebar");
      }
    };

    if (chekcUrl) setSidebarOpen(true);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen, chekcUrl]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <header id="header" className={`header fixed-top d-flex align-items-center justify-content-between ${chekcUrl ? "" : "justify-content-lg-end"} px-4`}>
      {chekcUrl ? (
        <div className="d-flex align-items-center">
          <div className="fw-bold" style={{ width: 275 }}>
            <Link href="/" className="text-decoration-none color-app-3 fs-4">
              ThinkEpic
            </Link>
          </div>
          {/* <div className="toggle-sidebar-btn" style={{ display: "block" }} onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </div> */}
        </div>
      ) : (
        <div className="toggle-sidebar-btn" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </div>
      )}

      <div className="d-flex justify-content-end align-items-center">
        <div className="search-bar">
          <div className="search-form d-flex align-items-center">
            <input type="text" name="search" autoComplete="off" className="rounded-pill px-4" placeholder="Search" title="Enter search keyword" style={{ backgroundColor: "#F5F8FE" }} />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <nav className="header-nav">
          <ul className="d-flex align-items-center gap-3">
            {/* <li className="nav-item dropdown">
            <SelectLanguange />
          </li> */}

            {status !== "authenticated" && (
              <li className="nav-item">
                <Link href="/auth" className="font-dm-sans text-decoration-none fw-normal px-3 py-2 badge rounded-pill bg-app-3" style={{ fontSize: ".9em" }}>
                  Sign In
                </Link>
              </li>
            )}

            {status === "authenticated" && (
              <>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown" style={{ fontSize: "18px" }}>
                    <i className="bi bi-bell-fill"></i>
                    <span className="badge bg-primary badge-number rounded-pill d-block" style={{ fontSize: "10px" }}>
                      4
                    </span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                    <li className="dropdown-header">
                      You have 4 new notifications
                      <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <NotificationItem />

                    <li className="dropdown-footer">
                      <a href="#">Show all notifications</a>
                    </li>
                  </ul>
                </li> */}

                <ProfileNav />
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
