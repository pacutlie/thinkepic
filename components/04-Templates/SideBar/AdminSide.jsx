import SideItem from "@/components/01-Atoms/SideItem";
import SubSideItem from "@/components/02-Molecules/SubSideItem";

export default function AdminSide() {
  return (
    <>
      <SideItem
        props={{
          title: "Dashboard",
          url: "admin",
          icon: "bi bi-grid",
        }}
      />

      <SubSideItem
        props={{
          title: "Postingan",
          target: "post-nav",
          icon: "bi bi-journal-text",
          subMenus: [
            { title: "Semua", url: "admin/post" },
            { title: "Tulis", url: "admin/post/write" },
          ],
        }}
      />

      {/* <SideItem
        props={{
          title: "Media",
          url: "admin/media",
          icon: "bi bi-bank",
        }}
      /> */}
    </>
  );
}
