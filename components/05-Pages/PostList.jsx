"use client";

import { GET } from "@/utils/Fetch";
import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import DynamicAlert from "@/utils/DynamicAlert";
import { calculateTimeAgo, filterHTMLTags, textTruncate } from "@/utils/Helper";

const thumbnail = (src) => (src ? `/assets/media/${src}` : "/assets/images/logo_epic2.png");

export default function PostList({ props }) {
  const category = props?.category ?? null;
  const subcategory = props?.subcategory ?? null;
  const title = props?.title ?? "Postingan Terbaru";

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET({ endpoint: `/api/post/home?page=${page}&limit=${limit}&category=${category}&subcategory=${subcategory}` });
      if (response.success) {
        setPosts(response.data);
        setLoading(false);
      } else {
        DynamicAlert(response.message, "error");
      }
    };
    fetchData();
  }, [page, keySearch, limit, category, subcategory]);

  function inisialUser(name) {
    name = name.trim();
    const words = name.split(" ");
    let initials = "";

    for (const word of words) {
      const initial = word[0].toUpperCase();
      initials += initial;
    }

    return initials;
  }

  return (
    <>
      {loading ? (
        <>
          <center>
            <h2 className="fw-bold">Memuat...</h2>
          </center>
          <Skeleton variant="text" width="100%" height={400} animation="wave" />
        </>
      ) : !posts.length ? (
        <center>
          <h2 className="fw-bold">Belum ada postingan</h2>
        </center>
      ) : (
        <>
          <center>
            <h2 className="fw-bold mb-5">{title}</h2>
          </center>
          <Grid container spacing={2}>
            {posts.map((post, index) => (
              <Grid item xs={window.innerWidth > 600 ? 3 : 12} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {inisialUser(post.author.name || "U")}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.author.name}
                    subheader={calculateTimeAgo(post.updated_at)}
                  />
                  <Link className="text-decoration-none" href={`/read/${post.id}`}>
                    <CardMedia component="img" height="150" image={thumbnail(post.thumbnail)} alt="image" />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={
                          window.innerWidth <= 600
                            ? {
                                fontSize: "11pt",
                                fontWeight: "bold",
                                lineHeight: "1",
                                color: "rgba(0,0,0,0.5)",
                              }
                            : {
                                fontSize: "14pt",
                                fontWeight: "bold",
                                lineHeight: "1",
                                color: "rgba(0,0,0,0.5)",
                              }
                        }
                        gutterBottom
                      >
                        {textTruncate(filterHTMLTags(post.title), 45)}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
