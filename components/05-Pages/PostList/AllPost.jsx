"use client";
import { GET } from "@/utils/Fetch";
import { useEffect, useState } from "react";
import PostItem from "@/components/04-Templates/PostItem";
import { Pagination, Skeleton } from "@mui/material";
import DynamicAlert from "@/utils/DynamicAlert";
import { useSession } from "next-auth/react";
// import refetching from "@/utils/ReloadPost";

export default function AllPost() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [keySearch, setKeySearch] = useState();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [count, setCount] = useState(0);

  // let query = null;
  // switch (session?.user.role) {
  //   case "AUTHOR":
  //   case "ADMIN":
  //     query = "&pending=true&rejected=true&reviewed=true&approved=true";
  //     break;
  //   case "SUPERADMIN":
  //     query = "&reviewed=true&approved=true";
  //     break;
  // }

  const fetchData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: `/api/post/all?page=${page}&limit=${limit}&pending=true&rejected=true&reviewed=true&approved=true` });
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
    // if (query) 
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, keySearch]);

  const handlePageChange = (e, newPage) => setPage(newPage);

  return (
    <>
      <div className="d-flex gap-2 w-25 mb-4 ms-auto">
        <select className="form-select" style={{ width: "70px" }} onChange={(e) => setLimit(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>

        <input type="text" className="form-control" name="search" id="search" placeholder="Cari..." autoComplete="off" />
      </div>
      {loading ? (
        <Skeleton variant="rounded" animation="wave" height={100} />
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
        <div className="text-center text-secondary mt-5 mb-4">
          <h1>
            <i className="bi bi-emoji-frown"></i>
          </h1>
          Postingan tidak ditemukan
        </div>
      )}
    </>
  );
}
