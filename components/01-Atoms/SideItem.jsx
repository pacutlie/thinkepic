"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideItem({ props }) {
  const title = props?.title;
  const url = props?.url;
  const icon = props?.icon ?? null;
  const pathname = usePathname();

  return (
    <li className="nav-item">
      <Link href={`/${url}`} legacyBehavior>
        <a className={`nav-link ${pathname !== url ? "collapsed" : ""}`}>
          <i className={icon}></i>
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
}
