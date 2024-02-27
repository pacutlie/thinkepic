"use client";

import Content from "@/components/02-Molecules/Content";
import { getPrivacyPolicy } from "@/libs/Routes";
import DynamicAlert from "@/utils/DynamicAlert";
import { GET } from "@/utils/Fetch";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const fetchData = async () => {
    const response = await GET({ endpoint: getPrivacyPolicy });

    if (response.success) {
      setContent(response?.data?.value);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid col-md-9 py-5 d-flex flex-column justify-content-center">
        <Content content={content} />
      </div>
    </>
  );
}
