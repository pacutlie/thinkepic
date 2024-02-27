import DynamicAlert from "@/utils/DynamicAlert";
import LinkButton from "../01-Atoms/LinkButton";
import Link from "next/link";

export default function AuthorAction({ id, fetchData }) {
  const alertDelete = () => DynamicAlert("Hapus postingan ini?", "warning", handleDelete);
  const handleDelete = () => fetchData("/api/post/delete");

  return (
    <>
      <LinkButton
        props={{
          title: "Hapus",
          className: "text-danger fs-sm",
        }}
        onClick={alertDelete}
      />
      <Link href={`/author/post/edit/${id}`}>Edit</Link>
    </>
  );
}
