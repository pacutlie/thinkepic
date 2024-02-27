"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DynamicAlert from "@/utils/DynamicAlert";
import { GET } from "@/utils/Fetch";
import { convertToText } from "@/utils/Helper";
import { getAbout, getTeams } from "@/libs/Routes";

export default function AboutPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [banner, setBanner] = useState("");
  const [teams, setTeams] = useState([]);

  const fetchDataAbout = async () => {
    const responseAbout = await GET({ endpoint: getAbout });
    const responseTeams = await GET({ endpoint: getTeams });

    if (responseAbout.success && responseTeams.success) {
      setTitle(responseAbout.data.title);
      setDescription(responseAbout.data.description);
      setAboutUs(responseAbout.data.about_us);
      setBanner(responseAbout.data.media.path);

      setTeams(responseTeams.data);
    } else {
      DynamicAlert("Upps, sepertinya server sedang bermasalah!", "error");
    }
  };

  useEffect(() => {
    fetchDataAbout();
  }, []);

  return (
    <>
      <div className="container-fluid col-md-9 layout-3 d-flex flex-column align-items-center justify-content-center gap-5 border-bottom border-2 pb-4">
        <div className="position-relative layout-3-banner mb-4">
          <div className="title bg-app position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center py-3 px-5">
            <h2 className="text-white">{title}</h2>
          </div>
          <Image src={banner} className="layout-img-3" width={0} height={0} sizes="100vw" style={{ objectFit: "cover", width: "100%" }} alt="banner" />
        </div>
        <p className="text-center fs-4 about-decsription">{description}</p>
      </div>

      <div className="container-fluid col-md-9 py-5 d-flex flex-column justify-content-center gap-4">
        <div>
          <h3 className="text-uppercase fw-bold mb-4">Tentang kami</h3>
          <p id="content">{convertToText(aboutUs)}</p>
        </div>
        <div>
          <h3 className="text-uppercase fw-bold mb-4">Tim Kami</h3>
          <div className="row g-4">
            {teams.map((e, i) => (
              <div className="col-md-3" key={i}>
                <Image src={e.media.path} alt="team" sizes="100vw" width={0} height={300} style={{ objectFit: "cover", width: "100%" }} />
                <div className="text-center text-white bg-app fw-bold text-uppercase p-2">{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
