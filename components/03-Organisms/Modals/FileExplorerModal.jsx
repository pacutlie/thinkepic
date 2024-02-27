// import Modal from "@/components/02-Molecules/Modal";
import onedrive from "@/public/assets/images/logos/onedrive.png";
import GoogleDrivePicker from "@/components/02-Molecules/GoogleDrivePicker";
import LocalStoragePicker from "@/components/02-Molecules/LocalStoragePicker";
import Image from "next/image";
import Modal from "./Modal";

export default function FileExplorerModal({ props, handleFilePicker }) {
  const handleClose = props?.handleClose;
  // const handleShow = props?.handleShow;
  const show = props?.show;
  // const target = props?.target || "selectFile";
  const title = props?.title || "Pilih Penyimpanan";
  return (
    // <Modal
    //   props={{
    //     title,
    //     target,
    //     classAdd: "modal-sm modal-dialog-centered",
    //   }}
    // >
    //   <div className="list-group list-group-flush">
    //     <LocalStoragePicker handleFilePicker={(file, fileUrl) => handleFilePicker(file, fileUrl)} />
    //     <GoogleDrivePicker handleFilePicker={(file, fileUrl) => handleFilePicker(file, fileUrl)} />
    //     <button type="button" className="list-group-item list-group-item-action d-flex gap-3 align-items-center p-4">
    //       <Image src={onedrive} alt="onedrive" width={30} height={0} />
    //       <span className="fw-semibold">OneDrive</span>
    //     </button>
    //   </div>
    // </Modal>

    <Modal
      props={{
        title,
        show,
        handleClose,
        showFooter: false,
      }}
    >
      <div className="list-group list-group-flush">
        <LocalStoragePicker handleClose={handleClose} handleFilePicker={(file, fileUrl) => handleFilePicker(file, fileUrl)} />
        <GoogleDrivePicker handleFilePicker={(file, fileUrl) => handleFilePicker(file, fileUrl)} />
        <button type="button" className="list-group-item list-group-item-action d-flex gap-3 align-items-center p-4">
          <Image src={onedrive} alt="onedrive" width={30} height={0} />
          <span className="fw-semibold">OneDrive</span>
        </button>
      </div>
    </Modal>
  );
}
