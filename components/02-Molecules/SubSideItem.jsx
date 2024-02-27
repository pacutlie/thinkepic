"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubSideItem({ props }) {
  const title = props?.title;
  const icon = props?.icon ?? null;
  const target = props?.target;
  const subMenus = props?.subMenus;
  const pathname = usePathname();
  const [collapse, setCollapse] = useState("collapse");

  return (
    <li className="nav-item">
      <a className="nav-link collapsed" data-bs-target={`#${target}`} data-bs-toggle="collapse" style={{ cursor: "pointer" }}>
        <i className={icon}></i>
        <span>{title}</span>
        <i className="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id={target} className={`nav-content ${collapse}`} data-bs-parent="#sidebar-nav">
        {subMenus.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/${item.url}`} className="text-decoration-none">
                <span>
                  <i className={item.icon} style={{ fontSize: "12pt" }}></i> {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
