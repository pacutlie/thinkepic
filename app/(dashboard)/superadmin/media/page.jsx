import BreadCrumb from "@/components/02-Molecules/BreadCrumb";
import Card from "@/components/02-Molecules/Card";
import FileManager from "@/components/04-Templates/FileManager";

export default function Media() {
  return (
    <>
      <BreadCrumb props={{ title: "Media" }} />
      <div className="row">
        <Card
          props={{
            title: "File Manager",
          }}
        >
          <FileManager />
        </Card>
      </div>
    </>
  );
}
