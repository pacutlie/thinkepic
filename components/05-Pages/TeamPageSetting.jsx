"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toastDone, toastProcess } from "@/utils/Toast";
import { addTeam, deleteTeam, getTeams, updateTeam } from "@/libs/Routes";
import { FILE, GET, POST } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";

export default function TeamPageSetting() {
  const errorOptions = { status: false, message: "" };
  const teamInputOptions = { name: "", about: "", image: "", imageUrl: "" };
  const [teams, setTeams] = useState([]);
  const [nameError, setNameError] = useState([errorOptions]);
  const [aboutError, setAboutError] = useState([errorOptions]);

  const fetchTeam = async () => {
    const response = await GET({ endpoint: getTeams });

    if (response.success) {
      setTeams(response.data);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const addTeamForm = () => {
    setTeams((prev) => [...prev, teamInputOptions]);
    setNameError((prev) => [...prev, errorOptions]);
    setAboutError((prev) => [...prev, errorOptions]);
  };

  const handleTeamName = (value, index) => {
    const items = [...teams];
    const item = {
      ...items[index],
      name: value,
    };
    items[index] = item;
    setTeams(items);
  };

  const handleTeamAbout = (value, index) => {
    const items = [...teams];
    const item = {
      ...items[index],
      about: value,
    };
    items[index] = item;
    setTeams(items);
  };

  const removeTeam = (index) => {
    const newTeam = [...teams];
    newTeam.splice(index, 1);
    setTeams(newTeam);

    const newNameError = [...nameError];
    newNameError.splice(index, 1);
    setNameError(newNameError);

    const newAboutError = [...aboutError];
    newAboutError.splice(index, 1);
    setAboutError(newAboutError);
  };

  const handleTeamImage = (event, index) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    setTeams((prev) => {
      const items = [...prev];
      const item = {
        ...items[index],
        image: file,
        imageUrl: fileUrl,
      };
      items[index] = item;
      return items;
    });
  };

  const checkInputs = (index) => {
    if (teams[index].name === "") {
      setNameError((prev) => {
        const items = [...prev];
        const item = {
          ...items[index],
          status: true,
          message: "Tidak boleh kosong",
        };
        items[index] = item;
        return items;
      });
    }

    if (teams[index].about === "") {
      setAboutError((prev) => {
        const items = [...prev];
        const item = {
          ...items[index],
          status: true,
          message: "Tidak boleh kosong",
        };
        items[index] = item;
        return items;
      });
    }

    if (teams[index].name === "" || teams[index].about === "") {
      return false;
    }

    return true;
  };

  const handleSave = async (index) => {
    if (!checkInputs(index)) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("name", teams[index].name);
    formData.append("about", teams[index].about);
    formData.append("image", teams[index].image);

    const response = await FILE({
      endpoint: addTeam,
      body: formData,
    });

    if (response.success) {
      toastDone(process, "Tim baru telah ditambahkan");
      fetchTeam();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleUpdate = async (index, id) => {
    if (!checkInputs(index)) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", teams[index].name);
    formData.append("about", teams[index].about);
    formData.append("image", teams[index].image);

    const response = await FILE({
      endpoint: updateTeam,
      body: formData,
    });

    if (response.success) {
      toastDone(process, "Tim telah diupdate");
      fetchTeam();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleDelete = (index, id) => {
    if (id) {
      DynamicAlert("Hapus tim ini?", "warning", () => doDelete(id));
    } else {
      removeTeam(index);
    }
  };

  const doDelete = async (id) => {
    const process = toastProcess();
    const response = await POST({ endpoint: deleteTeam, body: { id } });
    if (response.success) {
      toastDone(process, "Tim telah dihapus");
      fetchTeam();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  return (
    <>
      <div className="row justify-content-center g-4">
        {teams.map((e, i) => {
          const imgSrc = e.imageUrl || e.media?.path;

          return (
            <div className="col-md-2" key={i}>
              <div className="d-flex flex-column gap-3">
                <div className="border-bottom pb-3">
                  <label htmlFor={`banner-menu-${i}`} className={`border ${imgSrc ? "" : "bg-secondary-light"} thumbnail-uploader rounded d-flex justify-content-center align-items-center overflow-hidden`} style={{ minHeight: 200 }}>
                    {imgSrc ? (
                      <div className="w-100">
                        <Image priority src={imgSrc} width={0} height={0} sizes="100vw" style={{ objectFit: "cover", width: "auto", height: "auto", minWidth: "100%", maxHeight: 200 }} alt="preview" />
                      </div>
                    ) : (
                      <div className="text-secondary fs-4">Browse</div>
                    )}
                    <input type="file" accept="image/png, image/gif, image/jpeg" id={`banner-menu-${i}`} onChange={(event) => handleTeamImage(event, i)} hidden />
                  </label>
                </div>
                <div className="form-floating">
                  <input type="text" className={`form-control ${nameError[i]?.status ? "is-invalid" : ""}`} placeholder="Nama..." id={`name_${i}`} value={teams[i].name} onChange={(e) => handleTeamName(e.target.value, i)} />
                  <label className="text-secondary" htmlFor={`name_${i}`}>
                    Nama
                  </label>
                  {nameError[i]?.status && <span className="text-danger fs-sm">{nameError[i]?.message}</span>}
                </div>
                <div className="form-floating">
                  <textarea
                    className={`form-control ${aboutError[i]?.status ? "is-invalid" : ""}`}
                    type="text"
                    id={`tentang_${i}`}
                    placeholder="Tentang..."
                    style={{ height: "100px" }}
                    value={teams[i]?.about}
                    onChange={(e) => handleTeamAbout(e.target.value, i)}
                  ></textarea>
                  <label className="text-secondary" htmlFor={`tentang_${i}`}>
                    Tentang
                  </label>
                  {aboutError[i]?.status && <span className="text-danger fs-sm">{aboutError[i]?.message}</span>}
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-sm btn-danger d-flex gap-1 align-items-center justify-content-center w-100" onClick={() => handleDelete(i, e?.id)}>
                    <i className="bi bi-trash"></i>Hapus
                  </button>

                  {e?.id ? (
                    <button type="button" className="btn btn-sm btn-success d-flex gap-1 align-items-center justify-content-center" onClick={() => handleUpdate(i, e?.id)}>
                      <i className="bx bxs-save"></i>Update
                    </button>
                  ) : (
                    <button type="button" className="btn btn-sm btn-primary d-flex gap-1 align-items-center justify-content-center w-100" onClick={() => handleSave(i)}>
                      <i className="bx bxs-save"></i>Simpan
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-app d-flex gap-1 align-items-center justify-content-center" onClick={addTeamForm}>
          <i className="bi bi-plus-lg"></i> Tambah Tim
        </button>
      </div>
    </>
  );
}
