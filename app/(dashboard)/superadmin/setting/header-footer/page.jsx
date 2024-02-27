"use client";

import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import { useState } from "react";
import Image from "next/image";
import FIleExplorerModal from "@/components/03-Organisms/Modals/FileExplorerModal";

export default function FooterSetting() {
  const [showThinkEpicLogo, setShowThinkEpicLogo] = useState(false);
  const [showOtherLogo, setShowOtherLogo] = useState(false);

  const [thinkEpicLogo, setThinkEpicLogo] = useState("");
  const [thinkEpicLogoUrl, setThinkEpicLogoUrl] = useState("");

  const [otherLogo, setOtherLogo] = useState("");
  const [otherLogoUrl, setOtherLogoUrl] = useState("");

  const [otherLogoTotal, setOtherLogoTotal] = useState([1]);

  const handleShowThinkEpicLogo = () => setShowThinkEpicLogo(true);
  const handleCloseThinkEpicLogo = () => setShowThinkEpicLogo(false);

  const handleShowOtherLogo = () => setShowOtherLogo(true);
  const handleCloseOtherLogo = () => setShowOtherLogo(false);

  const handleThinkepicLogoPicker = (logo, logoUrl) => {
    setThinkEpicLogo(logo);
    setThinkEpicLogoUrl(logoUrl);
  };

  const handleOtherLogoPicker = (logo, logoUrl) => {
    setOtherLogo(logo);
    setOtherLogoUrl(logoUrl);
    setOtherLogoTotal([...otherLogoTotal, 1]);
  };

  const handleSaveThinkEpicLogo = () => {
    //
  };

  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["About"] }} />

      <FIleExplorerModal
        handleFilePicker={handleThinkepicLogoPicker}
        props={{
          show: showThinkEpicLogo,
          handleClose: handleCloseThinkEpicLogo,
        }}
      />

      <FIleExplorerModal
        handleFilePicker={handleOtherLogoPicker}
        props={{
          show: showOtherLogo,
          handleClose: handleCloseOtherLogo,
        }}
      />

      <Card>
        <div className="fw-bold text-secondary mb-3">Header</div>
        <div className="row mb-4">
          <label className="col-md-3 col-form-label">Logo ThinkEpic</label>
          <div className="col-md-9">
            <div className={`rounded ${thinkEpicLogoUrl ? "" : "bg-secondary-light"}`} style={{ minHeight: 200, maxWidth: 200 }}>
              {thinkEpicLogoUrl ? (
                <Image priority className="rounded" sizes="100vw" src={thinkEpicLogoUrl} width={0} height={200} style={{ objectFit: "cover", width: 200 }} alt="preview" />
              ) : (
                <div className="text-secondary fs-4 d-flex justify-content-center align-items-center" style={{ minHeight: 200, maxWidth: 200 }}>
                  Logo
                </div>
              )}
            </div>
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-sm btn-app-3" onClick={handleShowThinkEpicLogo}>
                Browse
              </button>
              <button className="btn btn-sm btn-primary" onClick={handleSaveThinkEpicLogo}>
                Simpan
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mb-4">
          <label className="col-md-3 col-form-label">Logo Lainnya</label>
          <div className="col-md-9">
            <div className="d-flex gap-3">
              {otherLogoTotal.map((e, i) => (
                <div key={i} className={`rounded border w-100 ${otherLogoUrl ? "" : "bg-secondary-light"}`} style={{ minHeight: 200, maxWidth: 200 }}>
                  {otherLogoUrl ? (
                    <Image priority className="rounded" sizes="100vw" src={otherLogoUrl} width={0} height={200} style={{ objectFit: "cover", width: 200 }} alt="preview" />
                  ) : (
                    <div className="text-secondary fs-4 d-flex justify-content-center align-items-center" style={{ minHeight: 200, maxWidth: 200 }}>
                      Logo
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-sm btn-app-3" onClick={handleShowOtherLogo}>
                Tambah
              </button>
              <button className="btn btn-sm btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
