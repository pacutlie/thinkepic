import Link from "next/link";
import React from "react";

export default function BreadCrumb({ props }) {
  const title = props?.title;
  const items = props?.items;

  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav className="d-flex justify-content-end">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{title}</li>
          {items?.map((item, index) => (
            <li className="breadcrumb-item active" key={index}>
              {item}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
