import Image from "next/image";
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
import gdrive from "@/public/assets/images/logos/gdrive.png";

export default function GoogleDrivePicker({ handleFilePicker }) {
  const [openPicker, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    document.getElementById("close-modal").click();
    openPicker({
      clientId: process.env.GOOGLE_ID,
      developerKey: process.env.GOOGLE_API_KEY,
      viewId: "DOCS",
      // token: process.env.GOOGLE_DRIVE_TOKEN,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "picked") {
          const url = data.docs[0].embedUrl;
          handleFilePicker(url);
        }
      },
    });
  };
  return (
    <button type="button" className="list-group-item list-group-item-action d-flex gap-3 align-items-center p-4" onClick={() => handleOpenPicker()}>
      <Image src={gdrive} alt="gdrive" width={30} height={0} />
      <span className="fw-semibold">Google Drive</span>
    </button>
  );
}
