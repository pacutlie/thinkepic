import Image from "next/image";
import Loader from "@/utils/Loader";
import FIleExplorerModal from "../03-Organisms/Modals/FileExplorerModal";

export default function PostThumbnail({ props }) {
  const target = props?.target ? props?.target : "selectFile";
  const fileUrl = props?.fileUrl ?? false;
  const height = props?.height || 200;
  const width = props?.width || "100%";
  const onClick = props?.onClick;

  return (
    <>
      {/* <FIleExplorerModal handleFilePicker={handleFilePicker} /> */}
      <div className={`rounded thumbnail-uploader ${fileUrl ? "" : "bg-secondary-light"}`} style={{ minHeight: height, maxWidth: width }} onClick={onClick}>
        {fileUrl ? (
          <Image priority className="rounded" sizes="100vw" src={fileUrl} width={0} height={height} style={{ objectFit: "cover", width }} alt="preview" loader={Loader} />
        ) : (
          <div className="text-secondary fs-4 d-flex justify-content-center align-items-center" style={{ minHeight: height, maxWidth: width }}>
            Browse
          </div>
        )}
      </div>
    </>
  );
}
