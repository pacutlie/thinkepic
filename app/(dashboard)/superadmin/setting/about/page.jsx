import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import AboutPageSetting from "@/components/05-Pages/AboutPageSetting";
import TeamPageSetting from "@/components/05-Pages/TeamPageSetting";

export default function AboutSetting() {
  return (
    <>
      <BreadCrumb props={{ title: "Pengaturan", items: ["About"] }} />

      <Card>
        <ul className="nav nav-tabs-bordered justify-content-center">
          <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#about-tab" type="button">
              Tentang
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#team-tab" type="button">
              Tim
            </button>
          </li>
        </ul>
        <div className="tab-content pt-4">
          <div className="tab-pane fade show active" id="about-tab">
            <AboutPageSetting />
          </div>
          <div className="tab-pane fade" id="team-tab">
            <TeamPageSetting />
          </div>
        </div>
      </Card>
    </>
  );
}
