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
import { getHomePost } from "@/libs/Routes";

export default function NewestPost() {
  const [loading, setLoading] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [limit, setLimit] = useState(4);
  const [titleLimit, setTitleLimit] = useState(0);
  const [textLimit, setTextLimit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET({ endpoint: getHomePost("limit=" + limit) });

      if (response.success) {
        setPosts(response.data);
        setLoading(false);
        setShowMoreLoading(false);

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
  }, [page, keySearch, limit]);

  const showMore = () => {
    setLimit(limit + 4);
    setShowMoreLoading(true);
  };

  return (
    <>
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
              <h2 className="fw-bold mb-5 text-uppercase">Postingan Terbaru</h2>
            </center>
            {posts.map((post) => (
              <div className="card my-3 my-md-4 shadow-none" key={post.id}>
                <div className="row g-2 g-md-4">
                  <div className="col-4 col-md-3">
                    <Image src={post?.media.path} width={0} height={0} sizes="100vw" className="img-fluid rounded-start" style={{ width: "100%", objectFit: "cover" }} alt="thumbnail" />
                  </div>
                  <div className="col-8 col-md-8">
                    <Link href={`read/${post.slug}`} className="text-decoration-none">
                      <h5 className="card-title fw-bold py-0 pt-md-2 l-4-title">{textTruncate(post.title, titleLimit)}</h5>
                      <p className="card-text py-0 l-4-p text-secondary">{textTruncate(filterHTMLTags(post?.content), textLimit)}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <hr className="my-4 mt-md-0" />
        <div className="d-flex justify-content-center">
          <button className="btn btn-app-3" type="button" onClick={showMore} disabled={showMoreLoading}>
            {showMoreLoading ? (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span className="spinner-border spinner-border-sm"></span>
                Memuat...
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <i className="ri-arrow-down-line"></i> Tampilkan lagi
              </div>
            )}
          </button>
        </div>
      </HomeContainer>
    </>
  );
}
