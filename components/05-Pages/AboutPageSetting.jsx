"use client";
import InputText from "@/components/02-Molecules/InputText";
import InputTextarea from "@/components/02-Molecules/InputTextarea";
import Editor from "@/components/03-Organisms/Editor";
import { useEffect, useState } from "react";
import ThumbnailUploader from "@/components/02-Molecules/PostThumbnail";
import { FILE, GET, POST } from "@/utils/Fetch";
import { getAbout, updateAbout } from "@/libs/Routes";
import { toastDone, toastProcess } from "@/utils/Toast";

export default function AboutPageSetting() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const handleFilePicker = (file, fileUrl) => {
    setFile(file);
    setFileUrl(fileUrl);
  };

  const fetchDataAbout = async () => {
    const response = await GET({ endpoint: getAbout });

    if (response.success) {
      setFileUrl(response.data.media.path);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setAboutUs(response.data.about_us);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  useEffect(() => {
    fetchDataAbout();
  }, []);

  const handleSubmit = async () => {
    const process = toastProcess();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("about_us", aboutUs);
    formData.append("image", file);

    const response = await FILE({
      endpoint: updateAbout,
      body: formData,
    });

    if (response.success) {
      toastDone(process, response.message);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  return (
    <>
      <div className="row mb-4">
        <label className="col-form-label col-md-4">Gambar</label>
        <div className="col-md-8">
          <ThumbnailUploader props={{ fileUrl, height: 400, handleFilePicker }} />
        </div>
      </div>
      <InputText
        props={{
          title: "Titel",
          placeholder: "Titel...",
          htmlFor: "title",
          name: "title",
          mb: "mb-4",
          labelCol: "col-sm-4",
          inputCol: "col-sm-8",
          autoComplete: "off",
          value: title,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputTextarea
        props={{
          title: "Deskripsi",
          placeholder: "Deskripsi",
          htmlFor: "description",
          name: "description",
          mb: "mb-4",
          labelCol: "col-sm-4",
          inputCol: "col-sm-8",
          autoComplete: "off",
          placeholder: "Deskripsi...",
          value: description,
        }}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row mb-4">
        <div className="col-sm-4">
          <label className="col-form-label">Tentang Kami</label>
        </div>
        <div className="col-sm-8">
          <Editor content={aboutUs} setContent={(value) => setAboutUs(value)} />
        </div>
      </div>

      <div className="row">
        <div className="col d-flex justify-content-end">
          <button type="button" className="btn btn-primary btn-lg" title="Simpan" onClick={handleSubmit}>
            Simpan
          </button>
        </div>
      </div>
    </>
  );
}
