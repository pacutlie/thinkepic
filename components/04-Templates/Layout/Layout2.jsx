"use client";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Skeleton } from "@mui/material";
import HomeContainer from "@/components/02-Molecules/HomeContainer";
import { useEffect, useState } from "react";
import { GET } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";
import { useSession } from "next-auth/react";
import { textTruncate } from "@/utils/Helper";
import Link from "next/link";
import PostLoader from "@/components/02-Molecules/PostLoader";
import PrevNexButton from "@/components/02-Molecules/PrevNexButton";

export default function Layout2({ props }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [limit, setLimit] = useState(8);
  const menuName = props?.menuName ?? null;
  const description = props?.description ?? null;
  const menuId = props?.menuId ?? null;
  const submenuId = props?.submenuId ?? null;
  const banner = props?.banner ?? null;

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET({ endpoint: `/api/post/home?page=${page}&limit=${limit}&menu=${menuId}&submenu=${submenuId}` });
      if (response.success) {
        setPosts(response.data);
        setLoading(false);
      } else {
        DynamicAlert(response.message, "error");
      }
    };
    fetchData();
  }, [page, keySearch, limit, menuId, submenuId]);

  return (
    <>
      <div className="position-relative layout-2 shadow-sm">
        {/* <div className="d-flex flex-column justify-content-center align-items-center text-white position-absolute top-0 start-0 w-50 h-100 bg-layout"> */}
        <div className="text-white position-absolute top-0 start-0 bg-layout">
          <div className="">
            <h1 className="fw-bolder">{menuName}</h1>
            <p>{description}</p>
          </div>
        </div>
        <Image src={banner} width={0} height={0} sizes="100vw" style={{ objectFit: "cover", width: "100%" }} alt="banner" />
      </div>

      <HomeContainer>
        {loading ? (
          <PostLoader />
        ) : !posts.length ? (
          <center>
            <h2 className="fw-bold">Belum ada postingan</h2>
          </center>
        ) : (
          <>
            <center>
              <h2 className="fw-bold mb-5 text-uppercase">Postingan</h2>
            </center>
            <div className="row justify-content-center">
              {posts.map((post, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card">
                    <Link className="text-decoration-none" href={`/read/${post.id}`}>
                      <Image src={post.thumbnail} className="card-img-top" width={0} height={250} style={{ objectFit: "cover", width: "100%" }} alt="thumbnail" />
                      <div className="card-body">
                        <h5 className="card-title fw-bold py-2">{post.title}</h5>
                        <p className="card-text link-secondary">{textTruncate(post.content, 120)}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <PrevNexButton />
      </HomeContainer>
    </>
  );
}
