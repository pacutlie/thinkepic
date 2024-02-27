import Loader from "@/utils/Loader";
import { toDate } from "@/utils/Helper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { POST } from "@/utils/Fetch";
import { toastDone, toastProcess } from "@/utils/Toast";
import AuthorActionButton from "./AuthorAction";
import AdminAction from "./AdminAction";
import SuperAdminAction from "../02-Molecules/SuperAdminAction";
import DynamicAlert from "@/utils/DynamicAlert";

export default function PostItem({ props, reloadData }) {
  const { data: session } = useSession();
  const id = props?.id;
  const title = props?.title;
  const content = props?.content;
  const category = props?.category;
  const created_at = props?.created_at;
  const status = props?.status;
  const viewed = props?.viewed;
  const thumbnail = props?.thumbnail ? props?.thumbnail : "/assets/images/no-image.jpg";

  let badge = "";
  let statusIcon = "";

  if (status === "PENDING") {
    badge = "bg-app-2";
    statusIcon = "bi bi-clock-history";
  } else if (status === "REVIEWED") {
    badge = "bg-info";
    statusIcon = "bi bi-check-circle-fill";
  } else if (status === "REJECTED") {
    badge = "bg-danger";
    statusIcon = "bi bi-x-circle-fill";
  } else if (status === "APPROVED") {
    badge = "bg-success";
    statusIcon = "bi bi-check-circle-fill";
  }

  const fetchData = async (endpoint) => {
    const process = toastProcess();
    const response = await POST({ endpoint, body: { id } });
    if (response.success) {
      toastDone(process, response.message);
      reloadData();
    } else {
      toastDone(process, response.message, "error");
      // DynamicAlert(response.message, "error");
    }
  };

  return (
    <>
      <div className="mb-4 d-flex gap-4">
        <Image
          src={thumbnail}
          className="img-fluid rounded"
          alt="Image"
          width={120}
          height={0}
          loader={Loader}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="d-flex flex-column justify-content-between gap-3">
          <div>
            <h5 className="fw-bold">{title}</h5>
            <div className="d-flex gap-2 mt-3">
              <div className={`${badge} badge rounded-pill`}>
                <i className={statusIcon}></i> {status}
              </div>
              <span className="text-muted fst-italic" style={{ fontSize: ".85rem" }}>
                Ditulis pada: {toDate(created_at)}
              </span>
            </div>
          </div>
          <div className="d-flex gap-4 fw-semibold">
            {session?.user.role === "AUTHOR" && <AuthorActionButton id={id} fetchData={fetchData} />}
            {session?.user.role === "ADMIN" && <AdminAction id={id} status={status} fetchData={fetchData} />}
            {session?.user.role === "SUPERADMIN" && <SuperAdminAction id={id} status={status} fetchData={fetchData} />}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
