"use client";
import HomeContainer from "@/components/02-Molecules/HomeContainer";
import SubPostItem from "@/components/02-Molecules/SubPostItem";
import { getHomePost } from "@/libs/Routes";
import { GET } from "@/utils/Fetch";
import { convertToText, toDate } from "@/utils/Helper";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ViewPost({ params }) {
  const slug = params.slug;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [subPost, setSubPost] = useState([]);
  const [postNotFound, setPostNotFound] = useState(false);
  const [pageRedirect, setPageRedirect] = useState(false);
  if (postNotFound) notFound();

  const fetchData = async () => {
    const postResponse = await GET({ endpoint: `/api/post/find/${slug}` });
    const otherPostResponse = await GET({ endpoint: getHomePost("limit=3") });
    if (!postResponse.data) return setPostNotFound(true);

    if (postResponse.success) {
      setPost(postResponse.data);
    } else {
      DynamicAlert(postResponse.message, "error");
    }

    if (otherPostResponse.success) {
      setSubPost(otherPostResponse.data);
    } else {
      DynamicAlert(otherPostResponse.message, "error");
    }

    if (postResponse.success && otherPostResponse.success) {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="container-fluid col-md-10 py-5 d-flex flex-column justify-content-center">
      <div className="row g-5">
        <div className="col-md-9">
          <div className="d-flex flex-column gap-4 bg-white rounded p-4">
            <div className="d-flex gap-3 align-items-center text-muted fs-sm">
              <div>
                <i className="bi bi-calendar2-fill me-2"></i>
                {toDate(post?.created_at)}
              </div>
              <span>|</span>
              <div>{post?.category}</div>
            </div>
            <h3 className="fw-semibold">{post?.title}</h3>
            <div className="rounded-3 overflow-hidden">
              <Image src={post?.media.path} width={0} height={350} style={{ objectFit: "cover", width: "100%" }} alt="banner" />
            </div>
            <div id="post-content">{convertToText(post?.content, "post-content")}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex flex-column gap-4 gap-md-4">
            <div className="d-flex flex-column gap-3">
              <div className="fs-5 fw-semibold">Cari Postingan</div>
              <div className="d-flex align-items-center search-post">
                <input type="text" className="rounded-2" placeholder="Cari" title="Masukkan kata kunci" name="search_post" />
                <i className="bi bi-search"></i>
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="fs-5 fw-semibold">Postingan Terbaru</div>
              {subPost.map((item, index) => (
                <SubPostItem
                  key={index}
                  props={{
                    thumbnail: item?.media.path,
                    title: item.title,
                    content: item.content,
                    slug: item.slug,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
