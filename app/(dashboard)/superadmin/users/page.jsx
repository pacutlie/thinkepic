"use client";

import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import AddUserModal from "@/components/03-Organisms/Modals/AddUserModal";
import UserTable from "@/components/05-Pages/Tables/UserTable";
import { GET } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import { toastDone, toastProcess } from "@/utils/Toast";

export default function Users() {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const response = await GET({ endpoint: "/api/user/all" });

    if (response.success) {
      setData(response.data);
      setPending(false);
    } else {
      toastDone(process, "Terjadi kesalahan saat mengambil data", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <BreadCrumb props={{ title: "Daftar User" }} />
      <div className="row g-3">
        <div className="col-12">
          <AddUserModal reloadTable={fetchUsers} />
        </div>
        <Card
          props={{
            title: "Users",
            subTitle: "Semua",
            col: "col-12",
          }}
        >
          <UserTable props={{ data, pending }} />
        </Card>
      </div>
    </>
  );
}
