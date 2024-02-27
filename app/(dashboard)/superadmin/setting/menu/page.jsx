"use client";

import RegularButton from "@/components/01-Atoms/RegularButton";
import Card from "@/components/02-Molecules/Card";
import DynamicAlert from "@/utils/DynamicAlert";
import { GET, POST } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import nprogress from "nprogress";
import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import ErrorLabel from "@/components/01-Atoms/ErrorLabel";
import { toast } from "react-toastify";
import { toastDone, toastProcess } from "@/utils/Toast";
import Image from "next/image";
import zIndex from "@mui/material/styles/zIndex";
import Link from "next/link";
import MenuTable from "@/components/05-Pages/Tables/MenuTable";

export default function MenuSetting() {
  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["Menu"] }} />
      <div className="row g-3">
        <div className="col-12">
          <Link href={"/superadmin/setting/menu/add"}>
            <button className="btn btn-primary">
              <i className="bi bi-plus-lg"></i> Tambah Menu
            </button>
          </Link>
        </div>

        <Card
          props={{
            title: "Menu",
            subTitle: "Semua",
            col: "col-12",
          }}
        >
          <MenuTable />
        </Card>
      </div>
    </>
  );
}
