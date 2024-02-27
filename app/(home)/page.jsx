"use client";

import Carousel from "@/components/03-Organisms/Carousel";
import Image from "next/image";
import { convertToText, textTruncate } from "@/utils/Helper";
import Link from "next/link";
import { getEmbedVideo, getHomePost, getSlide } from "@/libs/Routes";
import { useEffect, useState } from "react";
import { GET } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [embed, setEmbed] = useState("");
  const [sliders, setSliders] = useState([]);
  const [post, setPost] = useState([]);
  const [textLimit, setTextLimit] = useState(0);

  const fetchData = async () => {
    const sliderResponse = await GET({ endpoint: getSlide });
    const videoResponse = await GET({ endpoint: getEmbedVideo });
    const postResponse = await GET({ endpoint: getHomePost("limit=3") });

    if (sliderResponse.success) {
      setSliders(sliderResponse.data);
    } else {
      DynamicAlert(sliderResponse.message, "error");
    }

    if (videoResponse.success) {
      setEmbed(videoResponse.data.embed);
    } else {
      DynamicAlert(videoResponse.message, "error");
    }

    if (postResponse.success) {
      setPost(postResponse.data);
      if (window.innerWidth < 992) {
        setTextLimit(20);
      } else {
        setTextLimit(70);
      }
    } else {
      DynamicAlert(postResponse.message, "error");
    }

    if (sliderResponse.success && videoResponse.success && postResponse.success) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
                {post.map((e, i) => (
                  <Link href={`/read/${e.slug}`} key={e.id} className="text-decoration-none">
                    <div className="row mb-4">
                      <div className="col-5 col-md-4" style={{ maxHeight: 120, overflow: "hidden" }}>
                        <Image src={e.media.path} width={0} height={120} className="rounded w-100" alt={e.title} style={{ objectFit: "cover" }} />
                      </div>
                      <div className="col-7 col-md-8" style={{ maxHeight: 120, overflow: "hidden" }}>
                        <h5 className="card-title pt-0 pt-md-2 fw-bold">{textTruncate(e.title, textLimit)}</h5>
                        <div className="card-text text-black">{textTruncate(e.content, textLimit)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="d-flex justify-content-end">
                  <Link href="/newest">
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
            {post.map((e, i) => (
              <div className="col-sm-4" key={e.id}>
                <Link href={`/read/${e.slug}`} className="text-decoration-none">
                  <div className="card">
                    <Image src={e.media.path} className="card-img-top" width={0} height={250} style={{ objectFit: "cover" }} alt="..." />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{textTruncate(e.title, textLimit)}</h5>
                      <p className="card-text text-secondary">{textTruncate(e.content, textLimit)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
