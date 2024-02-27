import bannerImg from "@/public/assets/images/banner.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-app-2 container-fluid" height={500}>
      <div className="row">
        <div className="col p-0">
          <div className="position-relative">
            <Image src={bannerImg} className="banner" width={500} height={500} style={{ objectFit: "cover", width: "100%" }} alt="banner" />
            <div className="d-flex flex-column justify-content-center align-items-center text-white position-absolute top-50 start-50 translate-middle">
              <h1 className="fw-bolder">Welcome to ThinkEpiC</h1>
              <h5>Meeting Targets and Maintaining Epidemic Control (EpiC)</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
