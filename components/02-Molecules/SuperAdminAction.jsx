import DynamicAlert from "@/utils/DynamicAlert";
import LinkButton from "../01-Atoms/LinkButton";

export default function SuperAdminAction({ id, status, fetchData }) {
  const handleReject = () => fetchData("/api/post/reject");
  const handleApprove = () => fetchData("/api/post/approve");
  const alertReject = () => DynamicAlert("Tolak postingan ini?", "warning", handleReject);
  const alertApprove = () => DynamicAlert("Setujui postingan ini?", "warning", handleApprove);

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
          title: "Publish",
          className: "text-success fs-sm",
          disabled: status !== "REVIEWED",
        }}
        onClick={alertApprove}
      />
    </>
  );
}
