import DataTable from "react-data-table-component";
import { LinearProgress } from "@mui/material";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "NAMA",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "EMAIL",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "STATUS",
    selector: (row) => row.status.toLowerCase(),
    sortable: true,
  },
  {
    name: "ROLE",
    selector: (row) => row.role.toLowerCase(),
    sortable: true,
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

export default function UserTable({ props }) {
  return <DataTable columns={columns} data={props.data} progressPending={props.pending} progressComponent={<LinearIndeterminate />} />;
}
