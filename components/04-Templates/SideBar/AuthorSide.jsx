import SideItem from "../../01-Atoms/SideItem";
import SubSideItem from "../../02-Molecules/SubSideItem";

export default function AuthorSide() {
  return (
    <>
      <SideItem
        props={{
          title: "Dashboard",
          url: "author",
          icon: "bi bi-grid",
        }}
      />

      <SubSideItem
        props={{
          title: "Postingan",
          target: "forms-nav",
          icon: "bi bi-journal-text",
          subMenus: [
            { title: "Semua", url: "author/post" },
            { title: "Tulis", url: "author/post/write" },
          ],
        }}
      />

      {/* <SideItem
        props={{
          title: "Media",
          url: "author/media",
          icon: "bi bi-file-earmark-medical",
        }}
      /> */}
    </>
  );
}
