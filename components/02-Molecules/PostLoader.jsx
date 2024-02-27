import { Skeleton } from "@mui/material";

export default function PostLoader() {
  return (
    <>
      <center>
        <h2 className="fw-bold text-uppercase">Memuat...</h2>
      </center>
      <Skeleton variant="text" width="100%" height={400} animation="wave" />
    </>
  );
}
