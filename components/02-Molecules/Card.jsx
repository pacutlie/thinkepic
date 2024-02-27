export default function Card({ children, props }) {
  const title = props?.title;
  const subTitle = props?.subTitle;
  const col = props?.col ? props?.col : "col";
  const classAdd = props?.classAdd ? props?.classAdd : "";

  return (
    <div className={col}>
      <div className={`card info-card sales-card py-2`}>
        <div className="card-body px-4">
          <h5 className="card-title p-0 ">
            {title} {subTitle && <span>| {subTitle}</span>}
          </h5>

          {children}
        </div>
      </div>
    </div>
  );
}
