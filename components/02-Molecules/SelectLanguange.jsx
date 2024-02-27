"use client";

import Image from "next/image";
import { useState } from "react";

const SelectLanguange = () => {
  const [currentLanguage, setCurrentLanguage] = useState("id");

  const toggleLanguage = () => setCurrentLanguage(currentLanguage === "id" ? "en" : "id");

  return (
    <div className="nav-item dropdown me-3">
      <a className="nav-link" href="#" data-bs-toggle="dropdown">
        {/* <span>{currentLanguage === "id" ? "ID" : "EN"}</span> */}
        <Image width={30} height={30} style={{ objectFit: "cover" }} src={`/assets/images/flags/${currentLanguage === "id" ? "id" : "en"}.ico`} alt="Flag" />
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications py-2" style={{ marginRight: ".2rem" }}>
        <li>
          <a className="dropdown-item d-flex align-items-center" style={{ cursor: "pointer" }} onClick={toggleLanguage}>
            <Image width={30} height={30} src={`/assets/images/flags/${currentLanguage === "en" ? "id" : "en"}.ico`} alt="Flag" />
            <span className="d-none d-md-block ps-2">{currentLanguage === "en" ? "Indonesia" : "Inggris"}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SelectLanguange;
