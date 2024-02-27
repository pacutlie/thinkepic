import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import UserPostList from "@/components/05-Pages/PostList/AllPost";

export default function Posts() {
  return (
    <>
      <BreadCrumb props={{ title: "Postingan" }} />
      <div className="row">
        <Card
          props={{
            title: "Kelola",
            subTitle: "Postingan",
            col: "col-12",
          }}
        >
          <br />
          <UserPostList />
        </Card>
      </div>
    </>
  );
}
