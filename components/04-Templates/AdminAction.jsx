import DynamicAlert from "@/utils/DynamicAlert";
import LinkButton from "../01-Atoms/LinkButton";

export default function AdminAction({ id, status, fetchData }) {
  const alertReject = () => DynamicAlert("Tolak postingan ini?", "warning", handleReject);
  const alertDelete = () => DynamicAlert("Hapus postingan ini?", "warning", handleDelete);
  const alertReview = () => DynamicAlert("Review postingan ini?", "warning", handleReview);
  const handleDelete = () => fetchData("/api/post/delete");
  const handleReview = () => fetchData("/api/post/review");
  const handleReject = () => fetchData("/api/post/reject");

  return (
    <>
      <LinkButton
        props={{
          title: "Tolak",
          className: "text-danger fs-sm",
        }}
        onClick={alertReject}
      />
      <LinkButton
        props={{
          title: "Review",
          className: "text-info fs-sm",
          disabled: status !== "PENDING",
        }}
        onClick={alertReview}
      />
    </>
  );
}
