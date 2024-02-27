"use client";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Skeleton } from "@mui/material";
import HomeContainer from "@/components/02-Molecules/HomeContainer";
import { useEffect, useState } from "react";
import { GET } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";
import { useSession } from "next-auth/react";
import { filterHTMLTags, textTruncate } from "@/utils/Helper";
import Link from "next/link";
import PostLoader from "@/components/02-Molecules/PostLoader";
import PrevNexButton from "@/components/02-Molecules/PrevNexButton";

export default function Layout4({ props }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [limit, setLimit] = useState(8);
  const [titleLimit, setTitleLimit] = useState(0);
  const [textLimit, setTextLimit] = useState(0);
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
        if (window.innerWidth < 992) {
          setTitleLimit(25);
          setTextLimit(60);
        } else {
          setTitleLimit(200);
          setTextLimit(500);
        }
      } else {
        DynamicAlert(response.message, "error");
      }
    };
    fetchData();
  }, [page, keySearch, limit, menuId, submenuId]);

  return (
    <>
      <div className="layout-4 position-relative">
        <Image src={banner} className="layout-img-4" width={0} height={0} sizes="100vw" alt="banner" style={{ objectFit: "cover", width: "100%" }} />
        <div className="position-absolute top-0 start-0 w-100 h-100 text-white p-5">
          <div className="d-flex justify-content-center justify-content-md-end align-items-center h-100">
            <div className="menu-info">
              <h1 className="fw-bold title">{menuName}</h1>
              <p>{description}</p>
            </div>
          </div>
        </div>
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
            {posts.map((post, index) => (
              <div className="card my-3 my-md-4 shadow-sm" key={index}>
                <div className="row g-2 g-md-4">
                  <div className="col-5 col-md-3">
                    <Image src={post?.thumbnail} width={0} height={0} sizes="100vw" className="img-fluid rounded-start" style={{ width: "100%", objectFit: "cover" }} alt="thumbnail" />
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="mt-2">
                      <h5 className="card-title fw-bold py-0 pt-md-2 l-4-title">{textTruncate(post.title, titleLimit)}</h5>
                      <p className="card-text py-0 l-4-p">{textTruncate(filterHTMLTags(post?.content), textLimit)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <hr className="my-4 mt-md-0" />
        <PrevNexButton />
      </HomeContainer>
    </>
  );
}
