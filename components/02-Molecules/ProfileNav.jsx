"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import userDefault from "../../public/assets/images/user-default.png";

export default function ProfileNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user.role.toLowerCase();
  const userPhoto = session?.user.image ?? userDefault;

  const chekcUrl = (url) => {
    let status = false;
    for (const role of ["superadmin", "admin", "author"]) {
      status = !url.includes(role) ? true : false;
    }
    return status;
  };

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-profile" href="#" data-bs-toggle="dropdown">
        <Image src={userPhoto} className="rounded-circle" alt="Profile" width={30} height={30} style={{ objectFit: "cover" }} />
        {/* <span className="d-none d-md-block dropdown-toggle ps-2">{session?.user.name}</span> */}
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" style={{ minWidth: "240px", marginRight: ".2rem" }}>
        <li className="dropdown-header d-flex justify-content-between align-content-center">
          <Image src={userPhoto} className="rounded-circle" alt="Profile" width={40} height={40} style={{ objectFit: "cover" }} />
          <div>
            <div className="fw-bold">{session?.user.name}</div>
            <span className="fs-sm">{session?.user.role}</span>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        {chekcUrl(pathname) ? (
          <li>
            <Link className="dropdown-item d-flex align-items-center" href={`/${role}`}>
              <i className="bi bi-person"></i>
              <span>Dashboard</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link className="dropdown-item d-flex align-items-center" href={`/${role}`}>
              <i className="bi bi-person"></i>
              <span>Profil</span>
            </Link>
          </li>
        )}

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}
