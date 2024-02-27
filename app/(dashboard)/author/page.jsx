import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";

const page = async ({ children }) => {
  // const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <>
      <BreadCrumb props={{ title: "Dashboard" }} />
      <div className="row">
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card py-2">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title p-0">
                  Submit <span>| Proses</span>
                </h5>
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots color-app"></i>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clock-history text-info"></i>
                </div>
                <div className="ps-3">
                  <h6>0</h6>
                  <span className="text-success small pt-1 fw-bold">
                    <b className="color-app">Postingan</b>
                  </span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diproses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card py-2">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title p-0">
                  Submit <span>| Diterima</span>
                </h5>
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots color-app"></i>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-check text-success"></i>
                </div>
                <div className="ps-3">
                  <h6>0</h6>
                  <span className="text-success small pt-1 fw-bold">
                    <b className="color-app">Postingan</b>
                  </span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diterima</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card py-2">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title p-0">
                  Submit <span>| Ditolak</span>
                </h5>
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots color-app"></i>
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-x color-app"></i>
                </div>
                <div className="ps-3">
                  <h6>0</h6>
                  <span className="text-success small pt-1 fw-bold">
                    <b className="color-app">Postingan</b>
                  </span>{" "}
                  <span className="text-muted small pt-2 ps-1">Ditolak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card
          props={{
            title: "Postingan",
            subTitle: "Terbaru",
            col: "col-md-8",
          }}
        >
          <hr />
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn btn-sm btn-app">
              Semua artikel&nbsp;<i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </Card>

        <Card
          props={{
            title: "Aktifitas",
            subTitle: "Terbaru",
            col: "col-md-4",
          }}
        >
          <div className="activity">
            <div className="activity-item d-flex">
              <div className="activite-label">2 hour ago</div>
              <i className="bi bi-circle-fill activity-badge text-success align-self-start color-app2"></i>
              <div className="activity-content">
                Posting artikel baru sebagai{" "}
                <a href="#" className="fw-bold text-dark">
                  Draf
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default page;
