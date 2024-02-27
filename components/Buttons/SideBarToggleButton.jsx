"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SideBarToggleButton() {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setSidebarOpen(true);
  //   }
  // }, [status]);

  useEffect(() => {
    const body = document.body;

    if (window.innerWidth < 992) {
      if (isSidebarOpen) {
        body.classList.add("toggle-sidebar");
      } else {
        body.classList.remove("toggle-sidebar");
      }
    } else {
      if (isSidebarOpen) {
        body.classList.remove("toggle-sidebar");
      } else {
        body.classList.add("toggle-sidebar");
      }
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1199) {
        if (isSidebarOpen) {
          document.body.classList.add("toggle-sidebar");
        } else {
          document.body.classList.remove("toggle-sidebar");
        }
      } else {
        if (isSidebarOpen) {
          document.body.classList.remove("toggle-sidebar");
        } else {
          document.body.classList.add("toggle-sidebar");
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Link href="/" className="logo d-flex align-items-center">
        <Image src="/assets/images/logo.png" alt="logo epic" width={40} height={50} />
        <span className="d-none d-lg-block">
          <Image src="/assets/images/logotext.PNG" alt="logo epic" width={150} height={80} />
        </span>
      </Link>
      <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSideBar}></i>
    </>
  );
}
