import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import UserPostList from "@/components/05-Pages/PostList/AllPost";
import Link from "next/link";

export default function Posts() {
  return (
    <>
      <BreadCrumb props={{ title: "Postingan" }} />
      <div className="row g-3">
        <div className="col-12">
          <Link href={"/author/post/write"}>
            <button className="btn btn-primary">Tulis Postingan</button>
          </Link>
        </div>
        <Card
          props={{
            title: "Kelola",
            subTitle: "Postingan",
            col: "col-12",
          }}
        >
          <ul className="nav nav-tabs-bordered d-flex justify-content-center" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="articles-tab" data-bs-toggle="tab" data-bs-target="#articles" type="button">
                Artikel
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="draft-tab" data-bs-toggle="tab" data-bs-target="#draft" type="button">
                Draft
              </button>
            </li>
          </ul>
          <div className="tab-content pt-2">
            <div className="tab-pane fade active show" id="articles">
              <UserPostList />
            </div>
            <div className="tab-pane fade" id="draft">
              <br />
              <div className="row">
                <div className="col-md-6">{/* <AuthorPostItem /> */}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
