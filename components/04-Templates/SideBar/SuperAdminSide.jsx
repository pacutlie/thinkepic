import SideItem from "@/components/01-Atoms/SideItem";
import SubSideItem from "../../02-Molecules/SubSideItem";

export default function SuperAdminSide() {
  return (
    <>
      <SideItem
        props={{
          title: "Dashboard",
          url: "superadmin",
          icon: "bi bi-grid",
        }}
      />

      <SubSideItem
        props={{
          title: "Postingan",
          target: "post-nav",
          icon: "bi bi-journal-text",
          subMenus: [
            { title: "Semua", url: "superadmin/post" },
            { title: "Tulis", url: "superadmin/post/write" },
          ],
        }}
      />

      <SideItem
        props={{
          title: "Users",
          url: "superadmin/users",
          icon: "bi bi-people",
        }}
      />
      {/* 
      <SideItem
        props={{
          title: "Media",
          url: "superadmin/media",
          icon: "bi bi-file-earmark-medical",
        }}
      /> */}

      <SubSideItem
        props={{
          title: "Pengaturan",
          target: "setting-nav",
          icon: "bi bi-gear",
          subMenus: [
            { title: "Home", url: "superadmin/setting/home" },
            { title: "About", url: "superadmin/setting/about" },
            { title: "Menu", url: "superadmin/setting/menu" },
            { title: "Header & Footer", url: "superadmin/setting/header-footer" },
            { title: "Term of Use", url: "superadmin/setting/term-of-use" },
            { title: "Privacy Policy", url: "superadmin/setting/privacy-policy" },
            { title: "Sitemap", url: "superadmin/setting/sitemap" },
          ],
        }}
      />
    </>
  );
}
