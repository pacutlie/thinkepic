"use client";

import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import Editor from "@/components/03-Organisms/Editor";
import { getSitemap, saveSitemap } from "@/libs/Routes";
import { GET, POST } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import { toastDone, toastProcess } from "@/utils/Toast";

export default function SitemapSetting() {
  const [content, setContent] = useState("");

  const fetchData = async () => {
    const response = await GET({ endpoint: getSitemap });

    if (response.success) {
      setContent(response?.data?.value);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const process = toastProcess();

    const response = await POST({
      endpoint: saveSitemap,
      body: {
        value: content,
        type: "sitemap",
      },
    });

    if (response.success) {
      toastDone(process, response.message);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["Sitemap"] }} />
      <Card
        props={{
          title: "Sitemap",
        }}
      >
        <br />

        <div className="mb-4">
          <Editor content={content} setContent={(value) => setContent(value)} />
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary btn-lg" title="Simpan" onClick={handleSubmit}>
            Simpan
          </button>
        </div>
      </Card>
    </>
  );
}
