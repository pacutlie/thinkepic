"use client";

import SubSideItem from "../02-Molecules/SubSideItem";
import SideItem from "../01-Atoms/SideItem";
import { toSlug } from "@/utils/Helper";

export default function HomeSideBar({ menus }) {
  return (
    <aside id="sidebar" className="sidebar home-sidebar" style={{ zIndex: "999" }}>
      <ul className="sidebar-nav" id="sidebar-nav">
        {menus?.map((menu, index) => {
          if (!menu?.submenu.length) {
            return (
              <SideItem
                key={index}
                props={{
                  title: menu.name,
                  url: toSlug(menu.url),
                }}
              />
            );
          } else {
            const subMenus = menu?.submenu.map((submenu, index) => {
              return { title: submenu.name, url: toSlug(menu.name) + submenu.url };
            });
            return (
              <SubSideItem
                key={index}
                props={{
                  title: menu.name,
                  target: toSlug(menu.name),
                  subMenus,
                }}
              />
            );
          }
        })}
      </ul>
    </aside>
  );
}
