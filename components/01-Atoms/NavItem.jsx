"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ props }) {
  const { data: session } = useSession();
  const role = session?.user.role.toLowerCase();
  const title = props?.title;
  const icon = props?.icon;
  const addClass = props?.addClass;
  const url = props?.url ? role + "/" + props?.url : "";
  const pathname = usePathname();

  return (
    <li className="nav-item">
      <Link href={`/${url}`} legacyBehavior>
        <a className={`nav-link fw-normal ${addClass} ${pathname !== url ? "collapsed" : ""}`}>
          {icon && <i className={icon}></i>}
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
}
