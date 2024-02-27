import Link from "next/link";
import { convertToText } from "@/utils/Helper";

export default function Content({ content }) {
  return (
    <div className="row g-3 g-md-5">
      <div className="col-md-9">
        <p id="content">{convertToText(content)}</p>
      </div>
      <div className="col-md-3">
        <div className="rounded bg-app-3 w-100  d-flex flex-column">
          <div className="p-4 border-bottom">
            <Link className="text-light" href={"/term-of-use"}>
              Term Of Use
            </Link>
          </div>
          <div className="p-4 border-bottom">
            <Link className="text-light" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
          </div>
          <div className="p-4">
            <Link className="text-light" href={"/sitemap"}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
