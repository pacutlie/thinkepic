"use client";

import { useState, useEffect } from "react";
import { FILE, GET } from "@/utils/Fetch";
import { toast } from "react-toastify";
import { toastDone, toastProcess } from "@/utils/Toast";
import Editor from "@/components/03-Organisms/Editor";
import Card from "@/components/02-Molecules/Card";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PublishButton from "@/components/Buttons/PublishButton";
import Loader from "@/utils/Loader";
import ThumbnailUploader from "@/components/02-Molecules/PostThumbnail";

import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import FileExplorerModal from "../03-Organisms/Modals/FileExplorerModal";

export default function WritePost() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");
  const [menuOptions, setMenuOption] = useState([]);
  const [subMenuOptions, setSubmenuOption] = useState([]);
  const [disableSubmenu, setDisableSubmenu] = useState(true);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMenu = async () => {
    const response = await GET({ endpoint: "/api/menu/all" });
    if (response.success) {
      // nprogress.start();
      setMenuOption(response.data);
    } else {
      // nprogress.done();
      toast.error(response.message);
    }
  };

  const fetchSubmenu = async (id) => {
    const response = await GET({ endpoint: `/api/submenu/find/${id}` });
    if (response.success) {
      if (response.data.length) {
        setSubmenuOption(response.data);
        setDisableSubmenu(false);
      } else {
        setSubmenuOption([]);
        setDisableSubmenu(true);
        setSubMenu("");
      }
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChangeMenu = (value) => {
    setMenu(value);
    if (value !== "") {
      fetchSubmenu(value);
    } else {
      setSubMenu("");
      setDisableSubmenu(true);
    }
  };

  const handleFilePicker = (file, fileUrl) => {
    setFile(file);
    setFileUrl(fileUrl);
  };

  const checkInputs = () => {
    if (title === "") {
      toast.error("Judul masih kosong");
      return false;
    }
    if (content === "") {
      toast.error("Isi postingan masih kosong");
      return false;
    }

    if (menu === "") {
      toast.error("Menu belum dipilih");
      return false;
    } else {
      if (subMenuOptions.length && subMenu === "") {
        toast.error("Submenu belum dipilih");
        return false;
      }
    }

    if (title === "" || content === "" || menu === "") {
      toast.error("Beberapa input belum terisi");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    if (!checkInputs()) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("menu", menu);
    formData.append("submenu", subMenu);
    formData.append("thumbnail", file);

    const response = await FILE({
      endpoint: "/api/post/add",
      body: formData,
    });

    if (response.success) {
      toastDone(process, response.message);
      setTitle("");
      setContent("");
      setMenu("");
      setSubMenu("");
      setFileUrl("");
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleSaveDraft = () => {
    alert("oke");
  };

  return (
    <>
      <BreadCrumb props={{ title: "Tulis Postingan" }} />

      <FileExplorerModal
        handleFilePicker={handleFilePicker}
        props={{
          show,
          handleClose,
        }}
      />

      <div className="row">
        <div className="col-md-9">
          <Card>
            <div className="d-flex flex-column gap-4">
              <div>
                <label className="mb-2">Thumbnail</label>
                <ThumbnailUploader props={{ fileUrl, height: 350, onClick: handleShow }} />
              </div>
              <div>
                <label className="mb-2" htmlFor="title">
                  Titel
                </label>
                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
              </div>
              <div>
                <label className="mb-2">Konten</label>
                <Editor content={content} setContent={(value) => setContent(value)} />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-3">
          <div className="publish-btn">
            <Card>
              <div className="d-flex flex-column gap-4">
                <div>
                  <div className="fw-semibold text-dark mb-2">Menu</div>
                  <FormControl fullWidth>
                    <InputLabel id="menu">Pilih</InputLabel>
                    <Select labelId="menu" id="menu" value={menu} onChange={(e) => handleChangeMenu(e.target.value)} label="Pilih">
                      <MenuItem value="">Tidak ada</MenuItem>
                      {menuOptions.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <div className="fw-semibold text-dark mb-2">Sub Menu</div>
                  <FormControl fullWidth disabled={disableSubmenu}>
                    <InputLabel id="sub-menu">Pilih</InputLabel>
                    <Select labelId="sub-menu" id="sub-menu" value={subMenu} onChange={(e) => setSubMenu(e.target.value)} label="Pilih">
                      <MenuItem value="">Tidak ada</MenuItem>
                      {subMenuOptions.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <PublishButton
                  props={{
                    submit: handleSubmit,
                    saveDraft: handleSaveDraft,
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
