import Image from "next/image";
import folder from "@/public/assets/images/logos/folder.png";

export default function LocalStoragePicker({ handleFilePicker, handleClose }) {
  const handleFileChange = (e) => {
    {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      handleFilePicker(file, fileUrl);
    }
    handleClose();
  };

  return (
    <label htmlFor="file" className="list-group-item list-group-item-action d-flex gap-3 align-items-center p-4 pointer">
      <input type="file" id="file" hidden accept="image/*" onChange={handleFileChange} />
      <Image src={folder} alt="folder" width={30} height={0} />
      <span className="fw-semibold">Penyimpanan Lokal</span>
    </label>
  );
}
