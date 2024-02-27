"use client";

import DataTable from "react-data-table-component";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/02-Molecules/Dropdown";
import { toastDone, toastProcess } from "@/utils/Toast";
import DynamicAlert from "@/utils/DynamicAlert";
import { GET, POST } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import layout1 from "@/public/assets/images/layout/layout-1.png";
import layout2 from "@/public/assets/images/layout/layout-2.png";
import layout3 from "@/public/assets/images/layout/layout-3.png";
import layout4 from "@/public/assets/images/layout/layout-4.png";
import { deleteMenu, deleteSubmenu, getMenu } from "@/libs/Routes";

export default function MenuTable() {
  const [menus, setMenus] = useState([]);
  const [pending, setPending] = useState(true);

  const renderImg = ({ src, width = 150, height = 0 }) => <Image width={width} height={height} style={{ objectFit: "cover" }} src={src} alt="image" priority={false} />;

  const tableHeader = (title) => <div className="fw-bold text-uppercase">{title}</div>;

  const handleRemoveMenu = (id) => {
    DynamicAlert("Hapus menu ini? <br> <span>(Semua submenu akan ikut terhapus)</span>", "warning", () => removeMenu(id));
  };

  const handleRemoveSubmenu = (id) => {
    DynamicAlert("Hapus submenu ini?", "warning", () => removeSubmenu(id));
  };

  const checkLayout = (layout) => {
    switch (layout) {
      case "layout1":
        layout = layout1;
        break;
      case "layout2":
        layout = layout2;
        break;
      case "layout3":
        layout = layout3;
        break;
      case "layout4":
        layout = layout4;
        break;
    }

    return <div className="py-3">{renderImg({ src: layout, width: 85, height: 0 })}</div>;
  };

  const fetchMenu = async () => {
    const response = await GET({ endpoint: getMenu });
    if (response.success) {
      setMenus(response.data);
      setPending(false);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const removeMenu = async (subMenuId) => {
    const process = toastProcess();
    const response = await POST({
      endpoint: deleteMenu,
      body: {
        id: subMenuId,
      },
    });

    if (response.success) {
      toastDone(process, "Submenu telah dihapus!");
      fetchMenu();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const removeSubmenu = async (subMenuId) => {
    const process = toastProcess();
    const response = await POST({
      endpoint: deleteSubmenu,
      body: {
        id: subMenuId,
      },
    });

    if (response.success) {
      toastDone(process, "Submenu telah dihapus!");
      fetchMenu();
    } else {
      toastDone(process, response.message, "error");
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: tableHeader("Menu"),
      width: "170px",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: tableHeader("Banner"),
      width: "150px",
      sortable: true,
      selector: (row) => {
        return row.banner ? (
          <div className="py-3">
            <div className="border text-center p-1">{renderImg({ src: row.media.path, width: 105, height: 50 })}</div>
          </div>
        ) : (
          <div className="py-3">Tidak tersedia</div>
        );
      },
    },
    // {
    //   name: tableHeader("Layout"),
    //   width: "200px",
    //   sortable: true,
    //   selector: (row) => checkLayout(row.layout),
    // },
    {
      name: tableHeader("Aksi"),
      width: "150px",
      sortable: false,
      selector: (row) => (
        <div className="d-flex gap-1 py-3">
          <Link href={`/superadmin/setting/submenu/add/${row.id}`}>
            <button className="btn btn-sm btn-app rounded-pill" title="Tambah Submenu">
              <i className="bi bi-plus-lg"></i>
            </button>
          </Link>
          <Link href={`/superadmin/setting/menu/edit/${row.id}`}>
            <button className="btn btn-sm btn-warning rounded-pill" title="Edit">
              <i className="bi bi-pencil-square"></i>
            </button>
          </Link>
          <button className="btn btn-sm btn-danger rounded-pill" title="Hapus" onClick={() => handleRemoveMenu(row.id)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      ),
    },
    {
      name: tableHeader("Submenu"),
      sortable: true,
      selector: (row) =>
        !row.submenu.length ? (
          "Tidak ada"
        ) : (
          <div className="">
            {row.submenu.map((e, i) => (
              <div className={`${i == row.submenu.length - 1 ? "" : "border-bottom"} py-3`} key={i}>
                <div className="d-flex gap-1 justify-content-between align-items-center">
                  <div className="" style={{ minWidth: 160 }}>
                    {e.name}
                  </div>
                  {e.banner ? <div className="border p-1">{renderImg({ src: e.media.path, width: 100, height: 50 })}</div> : "Tidak tersedia"}
                  {/* <div>{checkLayout(e.layout)}</div> */}
                  <div className="d-flex gap-1">
                    <Link href={"/superadmin/setting/menu/add"}>
                      <button className="btn btn-sm btn-warning rounded-pill" title="Edit">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </Link>
                    <button className="btn btn-sm btn-danger rounded-pill" title="Hapus" onClick={() => handleRemoveSubmenu(e.id)}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
    },
  ];

  const LinearIndeterminate = () => {
    return (
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center my-4 text-secondary" style={{ minHeight: 100 }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    );
  };

  return <DataTable columns={columns} data={menus} progressPending={pending} progressComponent={<LinearIndeterminate />} />;
}
