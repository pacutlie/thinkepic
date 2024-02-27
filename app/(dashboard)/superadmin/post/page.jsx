"use client";
import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import { GET } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import PostItem from "@/components/04-Templates/PostItem";
import { CircularProgress, Pagination, Skeleton } from "@mui/material";
import DynamicAlert from "@/utils/DynamicAlert";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Posts() {
  const tabItems = [
    { title: "Semua", status: "all" },
    { title: "Pending", status: "pending" },
    { title: "Reviewed", status: "reviewed" },
    { title: "Approved", status: "approved" },
    { title: "Rejected", status: "rejected" },
  ];

  const all = "&pending=true&rejected=true&reviewed=true&approved=true";
  const pending = "&pending=true";
  const reviewed = "&reviewed=true";
  const approved = "&approved=true";
  const rejected = "&rejected=true";

  const [loading, setLoading] = useState(true);
  const [keySearch, setKeySearch] = useState();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState(all);

  const fetchData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: `/api/post/all?page=${page}&limit=${limit}${filter}` });
    if (response.success) {
      setRows(response.data);
      const count = response.count - limit !== 1 ? response.count - limit : 2;
      setCount(count);
      setLoading(false);
    } else {
      DynamicAlert(response.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, keySearch, filter]);

  const handleFilter = (status) => {
    switch (status) {
      case "all":
        setFilter(all);
        break;
      case "pending":
        setFilter(pending);
        break;
      case "reviewed":
        setFilter(reviewed);
        break;
      case "approved":
        setFilter(approved);
        break;
      case "rejected":
        setFilter(rejected);
        break;
    }
  };

  const handlePageChange = (e, newPage) => setPage(newPage);

  return (
    <>
      <BreadCrumb props={{ title: "Postingan" }} />
      <div className="row g-3">
        <div className="col-12">
          <Link href={"/superadmin/post/write"}>
            <button className="btn btn-primary">Tulis Postingan</button>
          </Link>
        </div>
        <Card>
          <ul className="nav nav-tabs-bordered" role="tablist">
            {tabItems.map((e, i) => (
              <li key={i} className="nav-item" role="presentation">
                <button className={`nav-link ${i === 0 ? "active" : ""}`} id={`${e.status}-tab`} data-bs-toggle="tab" type="button" onClick={() => handleFilter(e.status)}>
                  {e.title}
                </button>
              </li>
            ))}
            <div className="d-flex gap-2 w-25 mb-3 ms-auto">
              <select className="form-select" style={{ width: "70px" }} onChange={(e) => setLimit(e.target.value)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>

              <input type="text" className="form-control" name="search" id="search" placeholder="Cari..." autoComplete="off" />
            </div>
          </ul>
          <div className="tab-content pt-4">
            {loading ? (
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center my-4 text-secondary" style={{ minHeight: 100 }}>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div>Loading...</div>
              </div>
            ) : rows.length ? (
              <div className="mt-3">
                {rows.map((row) => (
                  <PostItem
                    key={row.id}
                    props={{
                      id: row.id,
                      title: row.title,
                      content: row.content,
                      category: row.category,
                      created_at: row.created_at,
                      status: row.status,
                      viewed: row.viewed,
                      thumbnail: row.thumbnail,
                    }}
                    reloadData={fetchData}
                  />
                ))}
                <div className="d-flex justify-content-end">
                  <Pagination count={count} size="large" shape="rounded" onChange={handlePageChange} />
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center my-4 text-secondary" style={{ minHeight: 100 }}>
                <h1 style={{ fontSize: "3rem" }}>
                  <i className="bi bi-emoji-frown"></i>
                </h1>
                Postingan tidak ditemukan
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
