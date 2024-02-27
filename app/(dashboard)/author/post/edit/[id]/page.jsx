"use client";

import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Editor from "@/components/03-Organisms/Editor";
import Card from "@/components/02-Molecules/Card";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import PublishButton from "@/components/Buttons/PublishButton";
import "react-quill/dist/quill.snow.css";
import { GET, POST } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";
import Image from "next/image";
import Loader from "@/utils/Loader";
import { useSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";
import ThumbnailUploader from "@/components/02-Molecules/PostThumbnail";

function EditPost({ params }) {
  const id = params.id;
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [postNotFound, setPostNotFound] = useState(false);
  const [pageRedirect, setPageRedirect] = useState(false);

  const [categoryOptions, setCategoryOption] = useState([]);

  if (postNotFound) notFound();
  if (pageRedirect) redirect("/author/post");

  const fetchCategories = async () => {
    const categories = await GET({ endpoint: "/api/category/all" });
    if (!categories.success) return DynamicAlert(categories.message, "error");
    setCategoryOption(categories.data);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await GET({ endpoint: `/api/post/find/${id}` });

      if (!res.success) return DynamicAlert(res.message, "error");

      if (!res.data) return setPostNotFound(true);

      setTitle(res.data.title);
      setContent(res.data.content);
      setCategory(res.data.category);
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const checkInputs = () => {
    if (title === "") {
      DynamicAlert("Judul artikel belum terisi", "warning");
      return false;
    }
    if (content === "") {
      DynamicAlert("Isi artikel belum terisi", "warning");
      return false;
    }

    if (category === "") {
      DynamicAlert("Kategori belum dipilih", "warning");
      return false;
    }

    if (title === "" || content === "" || category === "") {
      DynamicAlert("Beberapa input belum terisi", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    if (!checkInputs()) return;

    const response = await POST({
      endpoint: "/api/post/update",
      body: {
        id,
        title,
        content,
        category,
      },
    });

    if (response.success) {
      DynamicAlert(response.message, "successTime");
      setPageRedirect(true);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  const handleSaveDraft = () => {
    alert("oke");
  };

  return (
    <>
      <BreadCrumb props={{ title: "Edit Postingan" }} />
      <div className="row">
        <div className="col-md-9">
          <Card>
            <ThumbnailUploader />

            <div className="input-title mb-4">
              <TextField id="standard-basic" name="title" label="Judul" autoComplete="off" variant="standard" onInput={(e) => setTitle(e.target.value)} value={title} fullWidth />
            </div>

            <Editor value={content} setValue={(value) => setContent(value)} />
          </Card>
        </div>

        <div className="col-md-3">
          <Card
            props={{
              title: "Kategori",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Pilih</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} onChange={(e) => setCategory(e.target.value)} label="Pilih">
                {categoryOptions.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>

          <PublishButton
            props={{
              submit: handleSubmit,
              saveDraft: handleSaveDraft,
              update: true,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditPost;
