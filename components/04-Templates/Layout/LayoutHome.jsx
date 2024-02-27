"use client";

import Carousel from "@/components/03-Organisms/Carousel";
import Image from "next/image";
import { convertToText, textTruncate } from "@/utils/Helper";
import Link from "next/link";
import { getEmbedVideo, getSlide } from "@/libs/Routes";
import { useEffect, useState } from "react";
import { GET } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";

export default function LayoutHome() {
  const [embed, setEmbed] = useState("");
  const [sliders, setSliders] = useState([]);
  const fetchSlider = async () => {
    const response = await GET({ endpoint: getSlide });

    if (response.success) {
      setSliders(response.data);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  const fetchEmbedVideo = async () => {
    const response = await GET({ endpoint: getEmbedVideo });

    if (response.success) {
      setEmbed(response.data.embed);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  useEffect(() => {
    fetchSlider();
    fetchEmbedVideo();
  }, []);

  return (
    <>
      <Carousel
        props={{
          sliders,
          caption: true,
          indicator: true,
          button: true,
        }}
      />
      <div className="container mt-5 p-md-0">
        <div className="row g-5">
          <div className="col-md-6">
            <div className="d-flex flex-column gap-4 p-4 bg-white rounded-3 shadow-sm">
              <h3 className="text-center fw-bold">Berita Terbaru</h3>
              <div className="px-md-3">
                {sliders.map((e, i) => (
                  <div className="row mb-4" key={i}>
                    <div className="col-5 col-md-4" style={{ maxHeight: 120, overflow: "hidden" }}>
                      <Image src={e} width={0} height={120} className="rounded w-100" alt="..." style={{ objectFit: "cover" }} />
                    </div>
                    <div className="col-7 col-md-8" style={{ maxHeight: 120, overflow: "hidden" }}>
                      <h5 className="card-title pt-0 pt-md-2">Card with an image on left</h5>
                      <div className="card-text">{textTruncate("This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.", 40)}</div>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-end">
                  <Link href={"#"}>
                    <button className="btn btn-primary">Lihat lainnya &raquo;</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div id="home-video">
              <iframe width="560" height="315" src={embed} frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      <section style={{ backgroundColor: "#f3f4f6" }}>
        <div className="container d-flex flex-column gap-4 mt-5 pt-4 pb-2">
          <h1 className="text-center fw-bold">Berita Populer</h1>
          <div className="row justify-content-center g-md-5">
            {sliders.map((e, i) => (
              <div className="col-sm-4" key={i}>
                <div className="card">
                  <Image src={e} className="card-img-top" height={250} style={{ objectFit: "cover" }} alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Card with an image on top</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
