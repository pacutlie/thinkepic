"use client";

import { useEffect, useState } from "react";
import { FILE, GET, POST } from "@/utils/Fetch";
import Image from "next/image";
import { toastDone, toastProcess } from "@/utils/Toast";
import Card from "@/components/02-Molecules/Card";
import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import InputSlider from "@/components/03-Organisms/InputSlider";
import { addSlide, deleteSlide, getEmbedVideo, getSlide, saveEmbedVideo, updateSlide } from "@/libs/Routes";
import DynamicAlert from "@/utils/DynamicAlert";
import { toEmbedUrl } from "@/utils/Helper";

export default function HomeSetting() {
  const errorOptions = { status: false, message: "" };
  const sliderInputOptions = { title: "", caption: "", image: "", imageUrl: "" };

  const [embed, setEmbed] = useState("");
  const [slider, setSlider] = useState([sliderInputOptions]);
  const [titleError, setTitleError] = useState([errorOptions]);
  const [captionError, setCaptionError] = useState([errorOptions]);

  const fetchSlider = async () => {
    const response = await GET({ endpoint: getSlide });

    if (response.success && response.data.length) {
      setSlider(response.data);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const fetchEmbedVideo = async () => {
    const response = await GET({ endpoint: getEmbedVideo });

    if (response.success) {
      setEmbed(response.data?.embed);
    } else {
      toastDone(process, response.message, "error");
    }
  };

  useEffect(() => {
    fetchSlider();
    fetchEmbedVideo();
  }, []);

  const handleSaveEmbed = async () => {
    const process = toastProcess();

    const umbedUrl = toEmbedUrl(embed);

    const response = await POST({
      endpoint: saveEmbedVideo,
      body: { embed: umbedUrl },
    });

    if (response.success) {
      toastDone(process, "Embed video telah ditambahkan");
      fetchSlider();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const checkInputs = (index) => {
    if (slider[index].title === "") {
      setTitleError((prev) => {
        const items = [...prev];
        const item = {
          ...items[index],
          status: true,
          message: "Titel tidak boleh kosong",
        };
        items[index] = item;
        return items;
      });
    }

    if (slider[index].caption === "") {
      setCaptionError((prev) => {
        const items = [...prev];
        const item = {
          ...items[index],
          status: true,
          message: "Caption tidak boleh kosong",
        };
        items[index] = item;
        return items;
      });
    }

    if (slider[index].title === "" || slider[index].caption === "") {
      return false;
    }

    return true;
  };

  const handleSlideFile = (event, index) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    setSlider((prev) => {
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

  const addSlider = () => {
    setSlider((prev) => [...prev, sliderInputOptions]);
    setTitleError((prev) => [...prev, errorOptions]);
    setCaptionError((prev) => [...prev, errorOptions]);
  };

  const handleSave = async (index) => {
    if (!checkInputs(index)) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("title", slider[index].title);
    formData.append("caption", slider[index].caption);
    formData.append("image", slider[index].image);

    const response = await FILE({
      endpoint: addSlide,
      body: formData,
    });

    if (response.success) {
      toastDone(process, "Slide telah ditambahkan");
      fetchSlider();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleUpdate = async (index, id) => {
    if (!checkInputs(index)) return;

    const process = toastProcess();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", slider[index].title);
    formData.append("caption", slider[index].caption);
    formData.append("image", slider[index].image);

    const response = await FILE({
      endpoint: updateSlide,
      body: formData,
    });

    if (response.success) {
      toastDone(process, "Slide telah diupdate");
      fetchSlider();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const handleDelete = (index, id) => {
    if (id) {
      DynamicAlert("Hapus slide ini?", "warning", () => doDelete(id));
    } else {
      removeSlider(index);
    }
  };

  const doDelete = async (id) => {
    const process = toastProcess();
    const response = await POST({ endpoint: deleteSlide, body: { id } });
    if (response.success) {
      toastDone(process, "Slide telah dihapus");
      fetchSlider();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const removeSlider = (index) => {
    const newSlider = [...slider];
    newSlider.splice(index, 1);
    setSlider(newSlider);

    const newTitleError = [...titleError];
    newTitleError.splice(index, 1);
    setTitleError(newTitleError);

    const newCaptionError = [...captionError];
    newCaptionError.splice(index, 1);
    setCaptionError(newCaptionError);
  };

  const setSliderTitle = (value, index) => {
    const items = [...slider];
    const item = {
      ...items[index],
      title: value,
    };
    items[index] = item;
    setSlider(items);
  };

  const setSliderCaption = (value, index) => {
    const items = [...slider];
    const item = {
      ...items[index],
      caption: value,
    };
    items[index] = item;
    setSlider(items);
  };

  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["Home"] }} />

      <Card
        props={{
          title: "Home",
        }}
      >
        <br />
        <div className="row g-5">
          <div className="col-md-5">
            <div className="fw-bold text-secondary mb-3">Embed Video</div>
            <textarea className="form-control" cols="30" rows="10" placeholder="Embed video..." onChange={(e) => setEmbed(e.target.value)} value={embed}></textarea>
            <button className="btn btn-primary mt-3" onClick={handleSaveEmbed}>
              Simpan
            </button>
          </div>
          <div className="col">
            <div className="fw-bold text-secondary mb-3">Carousel</div>
            {slider.map((e, i) => (
              <div key={i}>
                <InputSlider
                  props={{
                    index: i,
                    slider,
                    titleError,
                    captionError,
                    handleSlideFile,
                    setSliderTitle,
                    setSliderCaption,
                    handleSave,
                    handleUpdate,
                    handleDelete,
                  }}
                />
                <hr />
              </div>
            ))}

            <button className="btn btn-sm btn-app rounded-pill d-flex gap-1 align-items-center justify-content-center" onClick={addSlider}>
              <i className="bi bi-plus-circle-dotted"></i> Tambah slide
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
