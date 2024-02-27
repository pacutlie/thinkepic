"use client";

import { useEffect, useState } from "react";
import { FILE, GET } from "@/utils/Fetch";
import Image from "next/image";
import InputText from "@/components/02-Molecules/InputText";
import { toastDone, toastProcess } from "@/utils/Toast";
import layout1 from "@/public/assets/images/layout/layout-1.png";
import layout2 from "@/public/assets/images/layout/layout-2.png";
import layout3 from "@/public/assets/images/layout/layout-3.png";
import layout4 from "@/public/assets/images/layout/layout-4.png";
import Card from "@/components/02-Molecules/Card";
import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import InputTextarea from "@/components/02-Molecules/InputTextarea";
import RegularButton from "@/components/01-Atoms/RegularButton";
import { toast } from "react-toastify";
import { notFound, redirect } from "next/navigation";
import DynamicAlert from "@/utils/DynamicAlert";

const layouts = [layout2, layout4];

export default function AddSubmenu({ params }) {
  const id = params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [layout, setLayout] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerFileUrl, setBannerFileUrl] = useState("");
  const [menuNotFound, setMenuNotFound] = useState(false);
  const [pageRedirect, setPageRedirect] = useState(false);

  if (menuNotFound) notFound();
  if (pageRedirect) redirect("/superadmin/setting/menu");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await GET({ endpoint: `/api/menu/find/${id}` });
      if (!res.success) return DynamicAlert(res.message, "error");
      if (!res.data) return setMenuNotFound(true);
    };
    fetchPost();
  }, [id]);

  const checkInputs = () => {
    if (name === "") toast.error("Nama submenu belum diisi");

    if (description === "") toast.error("Deskripsi belum diisi");

    if (name === "" || description === "") {
      return false;
    }

    return true;
  };

  const clearErrors = () => {
    resetInput();
  };

  const resetInput = () => {
    setName("");
    setDescription("");
    setBanner("");
    setBannerFileUrl("");
  };

  const handleSubmit = async () => {
    if (!checkInputs()) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("banner", banner);
    formData.append("layout", layout);

    const response = await FILE({
      endpoint: "/api/submenu/add",
      body: formData,
    });

    if (response.success) {
      toastDone(process, "Submenu baru telah ditambahkan");
      setPageRedirect(true);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleBannerMenu = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setBanner(file);
    setBannerFileUrl(fileUrl);
  };

  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["Menu", "Submenu", "Tambah"] }} />

      <Card
        props={{
          title: "Submenu",
          subTitle: "Tambah",
          col: "col-12",
        }}
      >
        <br />
        <InputText
          props={{
            title: "Nama",
            placeholder: "Nama",
            htmlFor: "name",
            name: "name",
            mb: "mb-4",
            labelCol: "col-sm-4",
            inputCol: "col-sm-8",
            autoComplete: "off",
          }}
          onChange={(e) => setName(e.target.value)}
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
          }}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="row mb-4">
          <div className="col-sm-4">Banner</div>
          <div className="col-sm-8">
            <label htmlFor="banner-menu" className={`border w-100 ${bannerFileUrl ? "" : "bg-secondary-light"} thumbnail-uploader rounded d-flex justify-content-center align-items-center overflow-hidden`} style={{ height: 350 }}>
              {bannerFileUrl ? (
                <div className="w-100">
                  <Image src={bannerFileUrl} width={0} height={350} sizes="100vw" style={{ objectFit: "cover", width: "100%" }} alt="preview" />
                </div>
              ) : (
                <div className="text-secondary fs-4">Browse</div>
              )}
              <input type="file" name="banner-menu" accept="image/png, image/gif, image/jpeg" id="banner-menu" onChange={handleBannerMenu} hidden />
            </label>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-sm-4">Layout</div>
          <div className="col-sm-8">
            <div className="row g-3">
              {layouts.map((e, i) => {
                i++;
                return (
                  <div className="col-md-6" key={i}>
                    <input type="radio" className="btn-check" value={`layout${i}`} name="layout" id={`layout${i}`} autocomplete="off" onChange={(e) => setLayout(e.target.value)} />
                    <label className="btn p-2 w-100" htmlFor={`layout${i}`}>
                      <div className="text-start text-muted mb-2">Layout {i}</div>
                      <Image alt="layout" style={{ width: "100%", height: "100%", objectFit: "cover" }} src={e} />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <RegularButton
              props={{
                title: "Simpan",
                addClass: "btn-primary btn-lg",
              }}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
