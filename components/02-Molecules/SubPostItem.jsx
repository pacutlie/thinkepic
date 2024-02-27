import { textTruncate } from "@/utils/Helper";
import Image from "next/image";
import Link from "next/link";

export default function SubPostItem({ props }) {
  const thumbnail = props?.thumbnail;
  const title = props?.title;
  const content = props?.content;
  const slug = props?.slug;

  return (
    <Link href={`/read/${slug}`} className="text-decoration-none sub-post">
      <div className="d-flex gap-3">
        <Image className="rounded-2" src={thumbnail} width={100} height={70} alt="image" />
        <div>
          <div className="fw-semibold color-app-3">{textTruncate(title, 25)}</div>
          <div className="text-muted fw-normal">{textTruncate(content, 25)}</div>
        </div>
      </div>
    </Link>
  );
}
