"use client";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Skeleton } from "@mui/material";
import HomeContainer from "@/components/02-Molecules/HomeContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DynamicAlert from "@/utils/DynamicAlert";
import { GET } from "@/utils/Fetch";
import { convertToText, filterHTMLTags, textTruncate } from "@/utils/Helper";
import PostLoader from "@/components/02-Molecules/PostLoader";
import Link from "next/link";
import team1 from "@/public/assets/images/teams/1.jpg";
import team2 from "@/public/assets/images/teams/2.jpg";
import team3 from "@/public/assets/images/teams/3.jpg";
import team4 from "@/public/assets/images/teams/4.jpg";

const banner = "/assets/media/SUPERADMIN_5d4e0a1e-2317-475a-9ce4-b654697f7e0b/53082373155_507e5d3fa8_k.jpg";

const teams = [team1, team2, team3, team4];

export default function LayoutAbout() {
  return (
    <>
      <div className="container-fluid col-md-9 layout-3 d-flex flex-column align-items-center justify-content-center gap-5 border-bottom border-2 pb-4">
        <div className="position-relative layout-3-banner mb-4">
          <div className="title bg-app position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center py-3 px-5">
            <h2 className="text-white">About</h2>
          </div>
          <Image src={banner} className="layout-img-3" width={0} height={0} sizes="100vw" style={{ objectFit: "cover", width: "100%" }} alt="banner" />
        </div>
        <p className="text-center fs-4 about-decsription">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores doloribus voluptatem facere ab eveniet quae repellendus a vel unde voluptas, neque nobis perferendis, est nam quaerat voluptate fuga? Delectus non fugit excepturi
        </p>
      </div>

      <div className="container-fluid col-md-9 py-5 d-flex flex-column justify-content-center gap-4">
        <div>
          <h3 className="text-uppercase fw-bold mb-4">Tentang kami</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores doloribus voluptatem facere ab eveniet quae repellendus a vel unde voluptas, neque nobis perferendis, est nam quaerat voluptate fuga? Delectus non fugit excepturi
            tempore veniam voluptates doloribus rem! Inventore atque autem quod perferendis officiis corporis vitae voluptate libero, adipisci facere mollitia voluptates a iusto. Dolorem laboriosam enim facere culpa modi, sed voluptatem
            minima odit consectetur doloremque vitae omnis inventore quae magnam eius. Earum, est debitis alias cum, accusantium unde inventore amet voluptatum dolorem ipsum, impedit natus molestias distinctio totam nam! Facere fugiat,
            porro quae aut temporibus placeat odit explicabo doloribus at non numquam soluta similique dolorem accusantium incidunt, maxime vel nihil sequi quidem? Illum, quae dolore numquam officiis consequuntur, voluptatum officia totam,
            deleniti unde necessitatibus et consequatur hic corrupti! Accusantium expedita, quas similique quibusdam voluptatibus possimus non sapiente officia illo illum rem quae, modi nesciunt. A ducimus soluta perspiciatis fugit eum
            quae, beatae sit officia magni obcaecati modi necessitatibus libero eos, laborum velit corrupti illum mollitia hic odit nisi atque dolorem. Nostrum, accusamus illum magnam quam quae itaque nam porro provident, incidunt ex labore
            dolore, officia beatae consequatur. Eos voluptas illo magni vero minima, voluptatibus harum accusantium fugit quisquam aut qui!
          </p>
        </div>
        <div>
          <h3 className="text-uppercase fw-bold mb-4">Tim Kami</h3>
          <div className="row justify-content-center g-4">
            {teams.map((e, i) => (
              <div className="col-md-3" key={i}>
                <Image src={e} alt="team" sizes="100vw" height={300} style={{ objectFit: "cover", width: "100%" }} />
                <div className="text-center text-white bg-app fw-bold text-uppercase p-2">Aucaman Lucilia</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
