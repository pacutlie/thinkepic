"use client";

import DynamicAlert from "@/utils/DynamicAlert";
import { GET } from "@/utils/Fetch";
import { toSlug } from "@/utils/Helper";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import { useState, useEffect, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import HomeSideBar from "./HomeSideBar";

// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    className="nav-link d-flex align-items-center"
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default function TabHeader() {
  const [menus, setMenus] = useState([]);
  const [progress, setProgress] = useState(true);

  const fetchMenus = async () => {
    setProgress(true);
    const response = await GET({ endpoint: "/api/menu/all" });
    if (response.success) {
      setProgress(false);
      setMenus(response.data);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <>
      <HomeSideBar menus={menus} />

      <nav className="navtab bg-app-3 d-lg-flex justify-content-center align-items-center gap-5 text-white px-5 py-3">
        {progress ? (
          <LinearProgress color="primary" variant="query" sx={{ width: "100%" }} />
        ) : (
          <>
            {menus?.map((item, index) => (
              <div key={index}>
                {!item?.submenu.length ? (
                  <Link className="nav-link" href={item.url}>
                    {item.name}
                  </Link>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                      {item.name}&nbsp;<i className="ri-arrow-down-s-line"></i>
                    </Dropdown.Toggle>

                    {item?.submenu.length && (
                      <Dropdown.Menu>
                        {item?.submenu.map((subitem, index) => {
                          const url = "/" + toSlug(item.name) + subitem.url;
                          return (
                            <Link key={index} href={url} className="dropdown-item">
                              {subitem.name}
                            </Link>
                          );
                        })}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                )}
              </div>
            ))}
          </>
        )}
      </nav>
    </>
  );
}
