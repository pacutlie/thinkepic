"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carousel({ props }) {
  const sliders = props?.sliders ?? [];
  const carouselTarget = props?.target ? props?.target : "carouselTarget";
  const carouselFade = props?.fade ? "carousel-fade" : "";
  const interval = props?.interval ?? 4000;
  const textAlign = props?.textAlign ?? "";
  const button = props?.button ?? false;
  const caption = props?.caption ?? false;
  const indicator = props?.indicator ?? false;

  return (
    <div id={carouselTarget} className={`carousel slide ${carouselFade}`} data-bs-ride="carousel">
      {indicator && (
        <div className="carousel-indicators">
          {sliders.map((slide, i) => (
            <button key={i} type="button" data-bs-target={`#${carouselTarget}`} data-bs-slide-to={i} className={i === 0 ? "active" : ""}></button>
          ))}
        </div>
      )}

      <div className="carousel-inner">
        {sliders.map((slide, i) => (
          <div className={`carousel-item ${i === 0 ? "active" : ""}`} data-bs-interval={interval} key={i}>
            <Image src={slide.media?.path} className="d-block w-100" width={0} height={0} sizes="100vw" alt="image" style={{ objectFit: "cover" }} />
            {caption && (
              <div className={`carousel-caption d-none d-md-block ${textAlign}`}>
                <h4 className="fw-bold">{slide?.title}</h4>
                <p>{slide?.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {button && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselTarget}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${carouselTarget}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}
