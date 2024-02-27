import Image from "next/image";
import logos from "@/public/assets/images/logos/3-logos-transparent-bg.png";

export default function LogoHeader() {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 gap-md-4 my-4 px-3 px-md-4">
      <h1 className="fw-bold color-app-3 text-center text-md-start">ThinkEpic</h1>
      <div className="other_logos">
        <Image src={logos} alt="logos" />
      </div>
    </div>
  );
}
